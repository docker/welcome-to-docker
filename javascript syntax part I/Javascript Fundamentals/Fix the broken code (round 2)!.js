
/////////////////////////////////////////////////WRONG WAY TO DO IT //////////////////////////////////////////////////
// Should print 'You are likely 2nd cousins.'
//write a function, whatRelation(), that has one number parameter, percentSharedDNA, and returns the likely relationship. 
//We expect the number passed in to always be an integer from 0 to 100.
function whatRelation(percentSharedDNA) {
    if (percentSharedDNA === 100) {
        return 'You are likely identical twins.';
    } else if (percentSharedDNA >= 35 && percentSharedDNA <= 99) {
        return 'You are likely parent and child or full siblings.';
    } else if (percentSharedDNA >= 14 && percentSharedDNA <= 34) {
        return 'You are likely grandparent and grandchild, aunt/uncle and niece/nephew, or half siblings.';
    } else if (percentSharedDNA >= 6 && percentSharedDNA <= 13) {
        return 'You are likely 1st cousins.';
    } else if (percentSharedDNA >= 3 && percentSharedDNA <= 5) {
        return 'You are likely 2nd cousins.';
    } else if (percentSharedDNA >= 1 && percentSharedDNA <= 2) {
        return 'You are likely 3rd cousins.';
    } else if (percentSharedDNA === 0) {
        return 'You are likely not related.';
    } else {
        return 'You are likely not related.';
    }
}
console.log(whatRelation(34))
// Should print 'You are likely grandparent and grandchild, aunt/uncle and niece/nephew, or half siblings.'

console.log(whatRelation(3))
// Should print 'You are likely 2nd cousins.'



/*There are a few issues with your code. Let's go through them one by one:

Issue with comparison operators:

The comparison operators in your code (=== and <) are not used correctly. You should use the >= and < operators
 to check the ranges properly.
Incorrect logic placement:

The line return 'You are likely 2nd'; is placed before the logic for the range 1-2. 
It should be moved after the logic for the 1-2 range.
Incorrect return statements:

The logic for the ranges 1-2, 0, and >0 is not properly structured. The return statements are not in the correct places. 
They should be adjusted to return the appropriate strings for each range.
Here's the corrected code:*/