# New Character Types

## Why `char` not good for UTF-8
In C++, `char` is a fundamental type that represents a byte-sized unit of data. Historically, it has been used to represent both ASCII characters and other narrow character sets, depending on the execution environment. 

Suppose we have the following C++ code (in C++11), with the source file saved as UTF-8 text:

```cpp 
// "你吃饭了吗?" literal is treated as a plain array of bytes, interpreted by
// the compiler as Windows-1252 single byte encoding.
const char* utf8_str = "你吃饭了吗?"; 
```

If the source file containing the Chinese characters "你吃饭了吗?" is saved as UTF-8 text, then the encoded representation of the text will also be in UTF-8 format. However, if the platform where the code is compiled is using a different encoding, such as Windows-1252, then the compiler may attempt to interpret the Chinese characters as single-byte characters in the Windows-1252 encoding, because the type of the variable `utf8_str` is declared as a plain `char` array, which relies on the execution environment to provide the encoding context. 

For example, the Chinese character "你" is represented by three bytes in UTF-8, which are `0xE4 0xBD 0xA0`. When interpreted as Windows-1252, the first byte `0xE4` is an invalid character, so the compiler replaces it with the ASCII replacement character `0x3F`. As a result, every byte of the UTF-8 encoded string "你吃饭了吗?" is replaced with the ASCII replacement character `0x3F` before being assigned to `utf8_str`. The mismatched data can cause unexpected results and errors in the program. 

### *Execution environment explained*
The "execution character set of the platform" refers to the character encoding scheme used by the operating system and/or the compiler to represent text data internally in a computer program.

In C and C++, the execution character set determines how characters are represented in the char data type. The specific character set used can vary depending on the platform, compiler, and locale settings.

For example, on Windows systems, the default execution character set is typically based on the Windows-1252 code page, which is a superset of ASCII that includes characters for European languages. On Unix-based systems, the default execution character set is typically based on the ASCII encoding.

## UTF-related character types

`char8_t` was introduced in C++20 to provide a distinct type that is guaranteed to represent an 8-bit code unit of UTF-8 encoded Unicode text. This allows for safer and more efficient handling of UTF-8 strings, as developers can use char8_t to represent individual code units of the UTF-8 encoding. This can help to avoid issues such as misinterpreting multi-byte sequences or incorrectly handling invalid code points. 

In the following code, `utf8_str` will have the correct UTF-8 code point values, regardless of the execution character set of the platform.

  ```cpp
// char8_t is a new C++20 type. The "u8" prefix makes sure the string literal is 
// interpreted as UTF-8 encoded text while enforcing type safety with char8_t.
// Without "u8" prefix, the string literal will be treated as "const char*" type,
// which is a type mismatch with char8_t, thus failing compiling.
const char8_t* utf8_str = u8"你吃饭了吗?"; 
// std::cout << utf8_str << std::endl; // This won't compile
```

 > In C++20, there is no `char8_t`-aware I/O streams (the overloaded std::cout for `char8_t`, `char16_t` and `char32_t` are marked as "delete". It is expected that the issue will be resolved in C++23 or C++26.

`char16_t` and `char32_t` were introduced in C++11 to provide support for Unicode text encoding. `char16_t` represents a 16-bit code unit of UTF-16 encoded Unicode text, while `char32_t` represents a 32-bit code unit of UTF-32 encoded Unicode text. 

| Type        | Introduced in | Main Reason for Introduction | Literal Prefix | Sample Code                                      |
|-------------|---------------|------------------------------|----------------|-------------------------------------------------|
| `char8_t`      | C++20         | UTF-8 encoding | `u8`         | `const char8_t* str = u8"吃了吗";`       |
| `char16_t`     | C++11         | UTF-16 encoding | `u`          | `const char16_t* str = u"吃了吗";`       |
| `char32_t`     | C++11         | UTF-32 encoding | `U`          | `const char32_t* str = U"吃了吗";`       |

The string literal prefix `u8`, `u`, `U` were introduced in C++11. The following code won't pass compilation with C++11 because they cannot be applied to characters. It is since C++17 that these literal prefix are allowed to be used with a character.

```cpp
char utf8c = u8'a'; // C++11 will fail but C++17/20 can pass
```

Also the following code would fail compiling because the value cannot fit a single byte.
```cpp
char utf8c = u8'好';
```

## Print UTF-8 string to console

`std::cout` cannot be used to output UTF-8 string to console. Use `printf` instead. On Windows, remember to set the active code page of the Windows commandline console to UTF-8 by running `chcp` command first.

```bash
chcp 65001
```

The following code uses `printf` to output an UTF-8 string.
```cpp
#include <iostream>

using namespace std;

// Remember to run Windows commandline command "chcp 65001" first to set the active
// code page to UTF-8.

int main() {
  // Null terminator automatically appended.
  char8_t utf8Chars[] = u8"你好世界";
  // Will have two null terminators. 
  char8_t utf8CharsWithNull[] = u8"你好世界\0"; 

  auto len_1 = std::char_traits<char8_t>::length(utf8Chars);
  auto len_2 = std::char_traits<char8_t>::length(utf8CharsWithNull);

  cout << "length(utf8Chars) = " 
       << len_1 
       << endl; // output 12

  cout << "length(utf8CharsWithNull) = " 
       << len_2 
       << endl; // output 12

  cout << "sizeof(char8_t) = " 
       << sizeof(char8_t) 
       << endl; // output 1
  
  // std::cout << utf8Words << std::endl; // This would fail compiling.  
  printf("%s", reinterpret_cast<char*>(&utf8Chars[0]));

  /*
  for (std::size_t i = 0; i < len; i++) {
    std::cout << utf8Chars[i] << '\n'; // This would fail compiling.
  }
  */

  return 0;
}

```

## Print a character of UTF-8 text to console
In C++20, the use of the `std::codecvt` facet is deprecated and discouraged. To display a UTF-8 string character on the Windows commandline console, we need to utilize the platform-specific `MultiByteToWideChar` function provided by Windows. This will convert the UTF-8 text to wide characters, which can then be output using `std::wcout`. If we need to access a particular character in the UTF-16 or UTF-32 text based on its position, we should apply the same approach.

```cpp
#include <iostream>
#include <locale>
#include <string>
#include <Windows.h>

using namespace std;

// Remember to run Windows commandline command "chcp 65001" first to set the active
// code page to UTF-8.

int main() {
    u8string my_string = u8"こんにちは";

    // my_string[0] is the byte value of the UTF-8 text at byte position 0.
    // The actual character could have multiple bytes.
    // std::cout << my_string[0] << std::endl; would fail compiling.

    // Get the required buffer size  
    int len = MultiByteToWideChar(CP_UTF8,
                                  0, 
                                  reinterpret_cast<const char*>(my_string.data()), 
                                  static_cast<int>(my_string.size()), 
                                  nullptr, 
                                  0);

    // Create a buffer of the required size
    wstring my_wstring(len, 0);

    // Convert to UTF-16 
    MultiByteToWideChar(CP_UTF8, 
                        0, 
                        reinterpret_cast<const char*>(my_string.data()), 
                        static_cast<int>(my_string.size()), 
                        &my_wstring[0], 
                        len); 

    locale::global(locale("en_US.UTF-8"));

    // Output the string
    wcout << my_wstring << endl; 

    for (int i = 0; i < len; i++) {
       wcout << my_wstring[i] << endl;    
    }

    return 0;
}
```



