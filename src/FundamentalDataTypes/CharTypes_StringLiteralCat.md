# Automatic String Literal Concatenation

Automatic concatenation of adjacent string literals is a feature present in both C and C++ programming languages. It allows the compiler to automatically merge two or more string literals that are placed next to each other, without any explicit concatenation operator. This can be useful for breaking long strings into shorter, more manageable pieces, while still treating them as a single string constant.

Here is an example:

```cpp
const char* my_string = "Hello,"
                        "World!";
```

The compiler will automatically concatenate the two string literals, resulting in the following:
```cpp
const char* my_string = "Hello,World!";
```

> This feature has its roots in the C programming language. It was inherited by C++ in the early 1980s.

## Notes on automatic string literal concatenation
Some nuances and caveats of using automatic concatenation of adjacent string literals:

### *Whitespace not strictly required*

Adjacent string literals can be separated by whitespace, like a `space`, a `tab`, or a `newline`, for the concatenation to occur. However, white space between the literals is not strictly required, so the following is still valid in both C and C++:
  ```cpp
  const char* my_string = "Hello,""World";
  ```
The compile will automatically concatenate the adjacent string literals, resulting in the following:
  ```cpp
  const char* my_string = "Hello,World";

  ```
> It's a good practice to include whitespace between adjacent string literals for better readability and maintainability.

### *Compile time concatenation*
The concatenation happens at compile-time, not at runtime, which means it has no performance overhead.

### *Variables or expressions not allowed*
Automatic concatenation can only be used with string literals, not with variables or other expressions.

### *Mixed encodings*
Be aware that trying to concatenate string literals with different character encodings may lead to compilation errors or unexpected behavior. For example, the following code will result in compiler error *"concatenation of string literals with conflicting encoding prefixes"*.
```cpp
const char8_t* utf8Chars = u8"Hello," 
                           L"World!";
```

If one of the string literals does not have prefix, it will be treated as having the same as others, hence the following is a valid operation:
```cpp
const char8_t* utf8Chars = u8"Hello," 
                           "World!"; // Equivalent to u8"World!"
```

## The `+` operator

Using the + operator for concatenation works differently than automatic concatenation of adjacent string literals. In C++, the `+` operator can be used to concatenate `std::string` objects or a `std::string` object and a string literal. However, the `+` operator cannot be used to concatenate two string literals directly.

Here is an example:

```cpp
#include <iostream>
#include <string>

int main() {
    std::string str1 = "Hello, ";
    std::string str2 = "World!";
    
    std::string result = str1 + str2 + "Oh Yeah"; // Valid in C++
    
    std::cout << result << std::endl;
    return 0;
}
```

In the example above, the + operator is used to concatenate two std::string objects. However, trying to do this with string literals directly will lead to a compilation error:

```cpp
const char* result = "Hello, " + "World!" + "Oh Yeah; // NOT valid in C++ (or C)
```

C does not have the `std::string` class and the `+` operator for concatenation. Use functions like `strcat` or `strncat` from the `string.h` library to concatenate character arrays (null-terminated strings). Remember to allocate enough memory for the concatenated result and ensure that the destination string is null-terminated.

Here's an example of using strcat and strncat functions in C:

```c
#include <stdio.h>
#include <string.h>

int main() {
    char str1[20] = "Hello, ";
    char str2[] = "world!";
    char str3[20] = "I am a string.";

    // Using strcat
    strcat(str1, str2);
    printf("str1 after strcat: %s\n", str1);

    // Using strncat
    strncat(str3, str2, 4);
    printf("str3 after strncat: %s\n", str3);

    return 0;
}

```

In the above code, we have used two different functions for concatenating strings.

- `strcat` function concatenates `str2` to the end of `str1` and modifies `str1`. After the `strcat` operation, `str1` will contain the concatenated string.

- `strncat` function concatenates a specified number of characters (in this case, 4) from  `str2` to the end of `str3` and modifies `str3`. After the strncat operation, `str3` will contain the concatenated string.

The output of the above code will be:
```c
str1 after strcat: Hello, world!
str3 after strncat: I am a string.worl
```