# Conditional Compilation 

## `if constexpr` and `#if`

C++'s `if constexpr` is not directly intended to replace conditional defines (e.g., `#ifdef` or `#if`). While they serve somewhat similar purposes, they have different use cases and operate at different stages of the compilation process.

`#ifdef` and `#if` are preprocessor directives in C++ that allow conditional compilation. They operate at the preprocessing stage, which occurs before the actual compilation. Conditional defines are typically used to conditionally include or exclude sections of code based on compile-time conditions or macros.

On the other hand, `if constexpr` is a feature introduced in C++17 that allows compile-time evaluation of conditions within the context of template metaprogramming or constexpr functions. It is part of the regular C++ code and is evaluated during the compilation process, not the preprocessing stage. `if constexpr` allows you to conditionally choose between different branches of code based on compile-time constant expressions.

Here's an example to illustrate the difference:

```cpp
#include <iostream>

#define USE_FEATURE

void doSomething() {
#ifdef USE_FEATURE
    std::cout << "Feature is enabled." << std::endl;
#else
    std::cout << "Feature is disabled." << std::endl;
#endif
}

template <bool UseFeature>
void doSomethingTemplate() {
    if constexpr (UseFeature) {
        std::cout << "Feature is enabled." << std::endl;
    } else {
        std::cout << "Feature is disabled." << std::endl;
    }
}

int main() {
    doSomething();  // Output depends on the USE_FEATURE macro.

    doSomethingTemplate<true>();  // Output depends on the template argument.
    doSomethingTemplate<false>();

    return 0;
}
```

In this example, `doSomething()` uses a conditional define to determine which section of code to compile based on the `USE_FEATURE` macro. On the other hand, `doSomethingTemplate()` is a function template that utilizes `if constexpr` to conditionally choose between different code branches at compile time based on the template argument.

While `if constexpr` can sometimes be used to achieve similar conditional behavior as conditional defines, their usage and capabilities are different. Conditional defines are more flexible and can be controlled externally via macros or command-line options, while `if constexpr` operates within the confines of the C++ code and allows compile-time decision making based on template arguments or constexpr conditions.

## Short-circuit behavior

Unlike regular `if` statements, where the short-circuit behavior applies to the evaluation of the condition, `if constexpr` evaluates the condition at compile-time, and all branches are checked for syntactic correctness regardless of the condition's value.

In this example:

```cpp
template <typename T>
void foo(T value) {
    if constexpr (std::is_integral_v<T> && (value > 0)) {
        // Code specific to integral types and positive values
        // ...
    } else {
        // Code for other cases
        // ...
    }
}
```

Both `std::is_integral_v<T>` and `(value > 0)` will be evaluated during compilation, regardless of the outcome of the condition. This means that any type-dependent or invalid code inside the discarded branch may still lead to compilation errors.

## Branch elimination

In an `if constexpr` statement, the condition is evaluated at compile-time. If the condition is determined to be `false` during compilation, the code inside the branch that is not taken (either `if` or `else`) is discarded by the compiler. The discarded branch is not checked for syntactic correctness or compiled.

This compile-time evaluation and branch elimination make `if constexpr` useful for conditional compilation and optimizing code based on compile-time conditions.

By discarding the unused branch, the compiler avoids checking its syntax and does not generate any corresponding object code. This can help improve the compile time and reduce the size of the resulting binary executable.

## Always provide `else` branch

It is generally a good practice to provide an `else` branch or alternative handling for all possible cases in an `if constexpr` statement to avoid potential runtime issues and ensure that all scenarios are properly handled.

```cpp
template<class T>
auto subtract(T a, T b) {
    if constexpr (std::is_same<T, double>::value) {
        if (std::abs(a - b) < 0.0001) {
            return 0.0;
        } else {
            return a - b;
        }
    } else if constexpr (std::is_integral<T>::value) {
        return a - b;
    } else {
        static_assert(always_false<T>::value, "Non-handled type for subtract function");
    }
}
```

In this code, both double and integral types are explicitly handled. If a type is used that is neither double nor an integral type, the static_assert will trigger a compile-time error with a clear message, which is generally preferable to a more obscure error about invalid operations. This is a more defensive programming strategy that makes sure all potential types are handled.


