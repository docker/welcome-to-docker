"""
Document ingestion and segmentation.

Supports plain text (.txt) and PDF (.pdf) inputs.
Splits the document into semantically meaningful segments for the
adversarial pipeline.  Each segment is sized to fit comfortably within
the model's context window while still representing a coherent legal
unit (clause, section, or a fixed-word-count chunk).
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path
from typing import List


# ---------------------------------------------------------------------------
# Data model
# ---------------------------------------------------------------------------

@dataclass
class DocumentSegment:
    segment_id: str       # e.g. "seg_001"
    page_hint: str        # e.g. "Pages 12-15" or "Chunk 3"
    text: str             # Raw clause / section text


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def load_and_segment(
    file_path: str | Path,
    words_per_segment: int = 800,
) -> List[DocumentSegment]:
    """
    Load a legal document and return a list of DocumentSegments.

    Strategy:
      1. Try to split on legal section headers first
         (e.g. "Section 4.", "ARTICLE V", "4.3 Representations").
      2. Fall back to fixed-word-count chunks if no headers are detected.

    Args:
        file_path:          Path to a .pdf or .txt file.
        words_per_segment:  Soft maximum words per segment (default 800).
                            The model will receive this plus the agent system
                            prompts, so keep this well below 5 000 words.
    """
    path = Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"Document not found: {path}")

    if path.suffix.lower() == ".pdf":
        raw_text = _extract_pdf(path)
    elif path.suffix.lower() in (".txt", ".md"):
        raw_text = path.read_text(encoding="utf-8")
    else:
        raise ValueError(f"Unsupported file type: {path.suffix}. Use .pdf or .txt")

    # Clean up whitespace artefacts from PDF extraction
    raw_text = _clean_text(raw_text)

    # Attempt section-aware splitting
    sections = _split_by_section_headers(raw_text)
    if len(sections) >= 3:
        segments = _merge_short_sections(sections, words_per_segment)
    else:
        # No clear headers — fall back to word-count chunks
        segments = _chunk_by_words(raw_text, words_per_segment)

    return [
        DocumentSegment(
            segment_id=f"seg_{i + 1:03d}",
            page_hint=f"Segment {i + 1} of {len(segments)}",
            text=seg.strip(),
        )
        for i, seg in enumerate(segments)
        if seg.strip()
    ]


def load_raw_text(file_path: str | Path) -> str:
    """Return the full, cleaned document text (no segmentation)."""
    path = Path(file_path)
    if path.suffix.lower() == ".pdf":
        return _clean_text(_extract_pdf(path))
    return _clean_text(path.read_text(encoding="utf-8"))


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

def _extract_pdf(path: Path) -> str:
    """Extract text from a PDF using pdfplumber (preferred) or pypdf."""
    try:
        import pdfplumber

        pages: List[str] = []
        with pdfplumber.open(path) as pdf:
            for page in pdf.pages:
                text = page.extract_text() or ""
                pages.append(text)
        return "\n\n".join(pages)
    except ImportError:
        pass

    try:
        from pypdf import PdfReader

        reader = PdfReader(str(path))
        pages = [page.extract_text() or "" for page in reader.pages]
        return "\n\n".join(pages)
    except ImportError:
        raise ImportError(
            "No PDF library found. Install pdfplumber or pypdf:\n"
            "  pip install pdfplumber"
        )


# Matches common legal section headers:
#   "Section 4.", "4.3", "ARTICLE V", "ARTICLE 5", "4.", "(a)", etc.
_SECTION_HEADER_RE = re.compile(
    r"(?m)^(?:"
    r"(?:Section|SECTION|Article|ARTICLE)\s+[\dA-Z]+[\.\s]"  # Section 4. / ARTICLE V
    r"|(?:\d+\.){1,3}\s"                                       # 4.3 or 4.3.1
    r"|\d+\.\s+[A-Z]"                                          # 4. Representations
    r")"
)


def _split_by_section_headers(text: str) -> List[str]:
    """Split text at detected legal section header boundaries."""
    boundaries = [m.start() for m in _SECTION_HEADER_RE.finditer(text)]
    if not boundaries:
        return []

    chunks: List[str] = []
    for i, start in enumerate(boundaries):
        end = boundaries[i + 1] if i + 1 < len(boundaries) else len(text)
        chunks.append(text[start:end])
    return chunks


def _merge_short_sections(sections: List[str], max_words: int) -> List[str]:
    """
    Merge consecutive short sections so every returned chunk is roughly
    max_words in size.  This avoids sending dozens of 20-word blurbs.
    """
    merged: List[str] = []
    buffer = ""
    for section in sections:
        candidate = (buffer + "\n\n" + section).strip()
        if len(candidate.split()) <= max_words:
            buffer = candidate
        else:
            if buffer:
                merged.append(buffer)
            buffer = section.strip()
    if buffer:
        merged.append(buffer)
    return merged


def _chunk_by_words(text: str, max_words: int) -> List[str]:
    """Naive fixed-size word-count chunking with a 10% overlap."""
    words = text.split()
    overlap = max(1, max_words // 10)
    chunks: List[str] = []
    start = 0
    while start < len(words):
        end = min(start + max_words, len(words))
        chunks.append(" ".join(words[start:end]))
        if end == len(words):
            break
        start = end - overlap
    return chunks


def _clean_text(text: str) -> str:
    """Normalise whitespace and remove common PDF extraction artefacts."""
    # Collapse runs of spaces/tabs to a single space
    text = re.sub(r"[ \t]{2,}", " ", text)
    # Collapse 3+ consecutive blank lines to 2
    text = re.sub(r"\n{3,}", "\n\n", text)
    # Remove form-feed characters
    text = text.replace("\f", "\n")
    return text.strip()
