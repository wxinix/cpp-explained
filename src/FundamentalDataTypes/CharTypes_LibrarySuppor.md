# Library Support

## Deprecated library support

| Component | Purpose | Status |
| --- | --- | --- |
|`template<class InternT, class ExternT, class StateT> class codecvt` defined in header `<locale>`| Provides a template class for converting between different character encodings | Deprecated in C++20|
|`<codecvt>` header | Provides a set of templates for character encoding conversion, including `std::codecvt_utf8`, `std::codecvt_utf16`, and `std::codecvt_utf8_utf16` | Deprecated in C++17 |
|`std::wstring_convert` | Provides a higher-level interface for converting between wide character strings (`std::wstring`) and narrow character strings (`std::string`) | Deprecated in C++17 |


## New string types

| String Type  | Description                                       | Basic Definition                                | Introduced in C++ |
|--------------|---------------------------------------------------|-------------------------------------------------|-------------------|
| u8string     | A string of 8-bit characters encoded in UTF-8     | `std::basic_string<char8_t>`                     | C++20             |
| u16string    | A string of 16-bit characters encoded in UTF-16   | `std::basic_string<char16_t>`                    | C++11             |
| u32string    | A string of 32-bit characters encoded in UTF-32   | `std::basic_string<char32_t>`                    | C++11             |

## `std::pmr::u8string`

`std::pmr::u8string` is a variant of the `std::basic_string` template that represents a sequence of 8-bit characters encoded in UTF-8 format, and allows for custom memory allocation using user-defined memory resources. It is part of the C++20 *Polymorphic Memory Resource* library (`std::pmr`).

To use `std::pmr::u8string`, you need to include the `<string>` and `<memory_resource>` headers, and create a `std::pmr::memory_resource` object to use as the memory allocator. You can then create an instance of `std::pmr::u8string` by passing the memory allocator as a constructor argument.

Here's an example of how to use `std::pmr::u8string`:

```cpp
#include <iostream>
#include <string>
#include <memory_resource>

int main()
{
    // create a memory pool using std::pmr::monotonic_buffer_resource
    std::pmr::monotonic_buffer_resource pool(1024);

    // create an std::pmr::u8string using the memory pool
    std::pmr::u8string str(u8"Hello, world!", &pool);

    // print the string to the console
    printf(reinterpret_cast<char*>(str.data()));

    return 0;
}
```

## C11 way

| Function  | Description                                                       |
| --------- | ----------------------------------------------------------------- |
| `mbrtoc16` | Converts a multibyte sequence to a 16-bit wide character           |
| `c16rtomb` | Converts a 16-bit wide character to a multibyte sequence           |
| `mbrtoc32` | Converts a multibyte sequence to a 32-bit wide character           |
| `c32rtomb` | Converts a 32-bit wide character to a multibyte sequence           |

These are C11 functions. 
> In the function name `mbrtoc16`, the "rto" stands for "read to". This function reads a multibyte character sequence and converts it to a 16-bit wide character. The "c16" part of the function name indicates that the output is a 16-bit character, while the "mb" part indicates that the input is a multibyte character sequence.

Here's an example of using the `mbrtoc16` function to convert a multibyte sequence to a 16-bit wide character:

```cpp
#include <stdio.h>
#include <uchar.h>
#include <locale.h>
#include <wchar.h>

int main() {
    setlocale(LC_ALL, "en_US.UTF-8");

    char mbstr[] = "Hello, world!"; // Note char8_t is not part of C language yet.
    char16_t wc16;
    mbstate_t state = { 0 };
    size_t res = mbrtoc16(&wc16, mbstr, sizeof(mbstr), &state);
    if (res == (size_t)-1 || res == (size_t)-2) {
        printf("Error: invalid multibyte sequence\n");
        return 1;
    }
    printf("The first character is: %lc\n", (wint_t)wc16);

    return 0;
}
```