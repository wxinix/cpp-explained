# Integer Type long long

## History
Before `long long` was officially added to the C++11 standard in 2011, C++ programmers already knew about the `long long`  integer type for a long time. It has been part of the C language since the C99 standard, and many major C++ compilers supported `long long` for compatibility with C.

As early as 1995, Roland Hartinger first proposed to add `long long`  to C++. At the time, the C committee had not yet considered this type. As a result, the C++ committee was reluctant to add a fundamental type that was not also in C. After `long long` had been added to C99, Stephen Adamczyk proposed to reconsider its addition to C++ in 2005. Finally, `long long` was accepted as part of C++ in 2011, more than ten years after it was first included in the C standard.

## Bit size
The C++ standard defines `long long` as an integer type that is at least 64 bits long, but it does not guarantee that `long long` will always be 64 bits on all platforms. The size of `long long` can depend on the architecture and the compiler being used. However, most modern platforms do support a 64-bit `long long` type. To ensure portability and avoid any potential issues, it's best to use the `sizeof` operator to determine the size of `long long` on a specific platform.

Remember that in C++, `long long` is a signed data type, and its corresponding unsigned data type is `unsigned long long`. It's important to note that `long long int` and `unsigned long long int` have the same meaning as `long long` and `unsigned long long`, respectively, with the latter forms being shorthand for the former ones.

## Literal suffix
The C++ standard defines `LL` and `ULL` as literal suffixes for `long long` and `unsigned long long`, respectively. When initializing a `long long` type variable, you can write it like this:

```cpp
long long x = 65536LL;
```

The literal suffix `LL` can be omitted with the same result:

```cpp
long long x = 65536;
```

When working with large integer values in C++, it is important to use literal suffixes to ensure that the code runs as intended. For example:

```cpp
long long x = 65536 << 16; // Value overflows to 0
std::cout << "x = " << x << std::endl;
long long y = 65536LL << 16;
std::cout << "y = " << y << std::endl;
```

The code `long long x = 65536 << 16` performs a bitwise left shift operation on the decimal value 65536 by 16 bits, which can result in an overflow and unexpected behavior.

To prevent overflowing, we should use the `LL` literal suffix to ensure that the value is treated as a `long long` data type, as in `long long y = 65536LL << 16`. This will ensure that the code runs as intended and the value is not unexpectedly truncated or overflowed.

## Numerical limits

We should avoid using `macro` as much as possible for defining the maximum and minimum values:
```cpp
#define LLONG_MAX 9223372036854775807LL        // long long max value
#define LLONG_MIN (-9223372036854775807LL - 1) // long long min value
#define ULLONG_MAX 0xFFFFFFFFFFFFFFFFULL       // unsigned long long max value
```

Instead, we should use `std::numeric_limits`:
```cpp
#include <iostream>
#include <limits>
#include <cstdio>

int main(int argc, char *argv[])
{
    // Avoid these!
    std::cout << "LLONG_MAX = "  
            << LLONG_MAX  
            << std::endl;

    std::cout << "LLONG_MIN = "  
            << LLONG_MIN  
            << std::endl;

    std::cout << "ULLONG_MAX = " 
            << ULLONG_MAX 
            << std::endl;

    std::printf("LLONG_MAX  = %lld\n", LLONG_MAX);  // format specifier %lld
    std::printf("LLONG_MIN  = %lld\n", LLONG_MIN);  // format specifier %lld
    std::printf("ULLONG_MAX = %llu\n", ULLONG_MAX); // format specifier %llu

    // Use std::numeric_limits
    std::cout << "std::numeric_limits<long long>::max() = " 
            << std::numeric_limits<long long>::max() 
            << std::endl;

    std::cout << "std::numeric_limits<long long>::min() = "
            << std::numeric_limits<long long>::min()
            << std::endl;

    std::cout << "std::numeric_limits<unsigned long long>::max() = "
            << std::numeric_limits<unsigned long long>::max() 
            << std::endl;
}
```