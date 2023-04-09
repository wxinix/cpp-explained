# Fundamental Data Types

The fundamental types in C++ include integer types, character types, and floating-point types. These types are considered fundamental because they are built into the language itself and can be used to create more complex data structures and objects. Additionally, they are the building blocks for other C++ data types, such as arrays, structures, and classes.

The following table lists the type specifiers of the fundamental data types in C++.

| Character Types | Integer Types | Floating-Point Types |
| --- | --- | --- |
| `char` | `bool` | `float` |
| `wchar_t` | `short` | `double` |
| `char16_t` | `int` | `long double` |
| `char32_t` | `long` | |
| `char8_t` | `long long` | |
| | `unsigned short` | |
| | `unsigned int` | |
| | `unsigned long` | |
| | `unsigned long long` | |
| | `signed char` | |
| | `unsigned char` | |

## `void`

`void` is considered a fundamental type in C++. It represents the absence of a value and is used as a placeholder in function signatures and pointer declarations. It cannot be used to declare variables because it has no size or storage, but it is an important part of the C++ language and is often used in conjunction with other data types.

## `bool`
`bool` is considered an integer type in C++, but it is often treated as a separate category due to its Boolean semantics.

## `signed char` and `unsigned char`
In C++, the `char` type is considered a distinct type that can be used to represent individual characters in text string. It is technically not considered an integer type, but does have an integer representation according to the ASCII or Unicode standard, which allows it to be used for integer calculations in some context.

When `signed` or `unsigned` is applied to `char`, it creates a type for small integers that can hold values between 0 and 255 (or -128 to 127 in the case of signed char).Therefore, `signed char` and `unsigned char` are both considered integer types.

Note that `char` is a distinct type from `signed char` and `unsigned char`, and it is not guaranteed to be signed or unsigned. The signedness of `char` is implementation-defined, and it can vary depending on the platform and the compiler.

## Type Qualifiers and CV-Correctness
Type specifiers can be combined with type qualifiers. In C++, there are two type qualifiers: `const` and `volatile`.

- `const` indicates that a variable's value cannot be modified after it has been initialized.
- `volatile` indicates that a variable's value can be modified by external factors such as hardware or other processes. Sometimes, `volatile` is applied to a variable to prevent compiler optimization.
  
CV-correctness is a programming concept in C++ that involves using the `const` and `volatile` type qualifiers to ensure that functions and data members behave correctly in the presence of `const` and `volatile` objects.

For example, a member function that does not modify the state of the object it operates on should be declared `const`. This ensures that the function can be called on `const` objects, and that it does not modify the state of the object.

```cpp
class Example {
public:
    // Declared const because it does not modify the object state
    int getValue() const; 
private:
    int value_;
};

int Example::getValue() const {
    return value_;
}
```

A member variable can also be declared `const` if it should not be modified in any case:

```cpp
class Example {
public:
    Example(int value) : value_(value) {}
    int getValue() const {
        // Cannot be modified because getValue is const
        return value_; 
    }
private:
    // Declared const to ensure it cannot be modified
    const int value_; 
};
```

The `volatile` qualifier can be applied to variables that can be changed by external factors, such as hardware or other processes. This ensures that the compiler does not optimize away accesses to the variable, which could cause incorrect behavior.

```cpp
volatile int* ptr; // Pointer to a volatile int
```

Using CV-correctness can help prevent errors and improve code safety by ensuring that functions and data members behave correctly in the presence of const and volatile objects.

## `mutable`
In C++, mutable is a type specifier that can be used to declare a non-static data member that can be modified even if the containing object is declared `const`. This is useful when the variable represents a cache or temporary value that does not affect the state of the object.

```cpp
class Example {
public:
    int getValue() const {
        // Marked const, so it cannot modify any non-mutable members.
        // However, it can modify mutable members such as cachedValue_.
        if (cachedValue_ == 0) {
            cachedValue_ = someExpensiveCalculation();
        }
        return cachedValue_;
    }

private:
    // Declared mutable to allow modification even 
    // if Example object is const
    mutable int cachedValue_;
};
```

In this example, `cachedValue_` is declared as `mutable`, which allows it to be modified even if the containing object is declared `const`. The `getValue()` function is declared `const`, which means it cannot modify any non-mutable members of the Example object, but it can modify the `mutable` member `cachedValue_`.