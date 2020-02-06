This password generator uses browser prompts to let the user choose their password parameters
Lower case, Upper case, Numbers and Special Characters are each a separate variable string to act as a character array.
These are pushed to the options array if their prompt is confirmed.
Two random functions will decide pick a string in the options array, and then a character in that string.
The character will then be added to the password, and the password will be returned after 'length' loops.