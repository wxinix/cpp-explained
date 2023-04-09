# Integer Types

## Common integer types
C++ supports several integer types with varying sizes and ranges. Here is a list of the most commonly used integer types in C++, available since the earlier versions of the language. Note that `char` is treated as integer type here for practical reason, though technically it is not.

| Type name | Typical Size (in bytes) | Range |
| --------- | -------------- | ----- |
| `bool`    | 1              | Boolean literal `true` or `false`, added in C++98 |
| `char`    | 1              | [-128, 127] or [0, 255] depending on signedness |
| `short`   | 2              | [-32,768, 32,767] |
| `int`     | 4              | [-2,147,483,648, 2,147,483,647] |
| `long`    | 4 or 8         | [-2,147,483,648, 2,147,483,647] or [-9,223,372,036,854,775,808, 9,223,372,036,854,775,807] depending on platform |
| `long long` | 8           | [-9,223,372,036,854,775,808, 9,223,372,036,854,775,807] |
| `unsigned char` | 1       | [0, 255] |
| `unsigned short` | 2      | [0, 65,535] |
| `unsigned int` | 4        | [0, 4,294,967,295] |
| `unsigned long` | 4 or 8   | [0, 4,294,967,295] or [0, 18,446,744,073,709,551,615] depending on platform |
| `unsigned long long` | 8 | [0, 18,446,744,073,709,551,615] |

The C++ standard does not specify the minimum bytes for these integer types, except the following constraints:

```cpp
sizeof(char)      == 1                  // Rule 1
sizeof(char)      <= sizeof(short)      // Rule 2
sizeof(short)     <= sizeof(int)        // Rule 3
sizeof(int)       <= sizeof(long)       // Rule 4
sizeof(long)      <= sizeof(long long)  // Rule 5
sizeof(char)      *  CHAR_BIT >= 8      // Rule 6
sizeof(short)     *  CHAR_BIT >= 16     // Rule 7
sizeof(int)       *  CHAR_BIT >= 16     // Rule 8
sizeof(long)      *  CHAR_BIT >= 32     // Rule 9
sizeof(long long) *  CHAR_BIT >= 64     // Rule 10
```

`CHAR_BIT` represents the number of bits in a char type. Although most modern architectures use 8 bits per byte, this is not always the case as some older machines may have used 7-bit bytes. Under Rule 4, C/C++ allows `long` and `int` to have the same size, but it must be at least 32 bits according to Rule 9.

## Fixed size integer types

The C++11 standard introduced new integer types such as `int8_t`, `int16_t`, `int32_t`, and `int64_t` with fixed sizes, as well as their unsigned counterparts, `uint8_t`, `uint16_t`, `uint32_t`, and `uint64_t`. These types are guaranteed to have the specified size and range on any conforming implementation. 

The following table summarizes fixed size integer types - note that the `intN_t` and `uintN_t` types are guaranteed to have exactly `N` bits, where `N` is 8, 16, 32, or 64.

| Type       | Size (in bytes) | Range                                          |
|------------|----------------|------------------------------------------------|
| `int8_t`   | 1              | [-128, 127]                                    |
| `uint8_t`  | 1              | [0, 255]                                       |
| `int16_t`  | 2              | [-32,768, 32,767]                              |
| `uint16_t` | 2              | [0, 65,535]                                    |
| `int32_t`  | 4              | [-2,147,483,648, 2,147,483,647]                |
| `uint32_t` | 4              | [0, 4,294,967,295]                              |
| `int64_t`  | 8              | [-9,223,372,036,854,775,808, 9,223,372,036,854,775,807] |
| `uint64_t` | 8              | [0, 18,446,744,073,709,551,615]                 |


## 128-bit integer types

The C++ standard does not define a 128-bit integer type, as of the latest version C++20.

However, some compilers and libraries provide extensions that define a 128-bit integer type. For example, the GCC and Clang compilers provide an __int128 type, which is a 128-bit signed integer type. The Boost Multiprecision library provides several integer types with arbitrary precision, including a boost::multiprecision::int128_t type.

| Type name | Library/Compiler | Description |
| --------- | ---------------- | ----------- |
| `__int128` | GCC, Clang | A 128-bit signed integer type |
| `unsigned __int128` | GCC, Clang | A 128-bit unsigned integer type |
| `int128_t` | Boost Multiprecision | A 128-bit signed integer type |
| `uint128_t` | Boost Multiprecision | A 128-bit unsigned integer type |

It's important to note that the availability and behavior of non-standard integer types may vary depending on the platform and compiler used.