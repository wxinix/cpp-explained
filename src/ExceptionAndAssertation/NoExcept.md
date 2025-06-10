# `noexcept` in Modern C++

C++11 introduced `noexcept` as a replacement and improvement over the older `throw()`-style exception specifications. It plays a vital role in optimization, particularly in generic programming and move semantics. Later revisions of C++ reinforced its importance, culminating in significant changes by C++20.


## What is `noexcept`?

`noexcept` is both:

* An **exception specification** (like `noexcept` or `noexcept(true)`), telling the compiler a function won't throw.
* A **compile-time operator** (`noexcept(expression)`) that returns `true` if the expression is known not to throw.


## Why Not Use `throw()`?

Before C++11:

```cpp
void foo() throw();                   // Not supposed to throw any exceptions
void bar() throw(std::runtime_error); // Supposed to throw only specific exceptions
```

These had weak compiler enforcement and inconsistent support. Worse, `throw()` required stack unwinding and called `std::unexpected()` on violation. In C++ 20, `throw()` is removed entirely.

In contrast, `noexcept` calls `std::terminate()` directly, avoiding complex runtime behavior and enabling better optimizations.


## Basic `noexcept` Usage

```cpp
int f() noexcept {
    return 42;
}

struct X {
    int g() const noexcept {
        return 58;
    }

    void h() noexcept {}
};
```

Declaring functions `noexcept` helps the compiler generate better code, especially in templates and STL containers.

---

## Conditional `noexcept` with Templates

You often want to declare `noexcept` *only if* the operations inside a template won’t throw:

```cpp
#include <type_traits>

template <typename T>
T copy(const T& o) noexcept(std::is_nothrow_copy_constructible<T>::value) {
    return T(o); // Calls the copy ctor of T
}

// std::is_nothrow_copy_constructible<T>::value is a compile time boolean constant, and is 
// true if the type T has a copy ctor that is declared noexcept
```

Or more generally:

```cpp
template <typename T>
T copy(const T& o) noexcept(noexcept(T(o))) {
    return T(o);
}
```

Here, the outer `noexcept(...)` is the specifier, and the inner is the operator.


## `noexcept` and Move Semantics

Using move operations inside containers is risky if the move constructor/assignment might throw. `noexcept` helps guide the compiler to choose moves over copies safely.

### Example: Safe `swap` with `noexcept`

```cpp
#include <utility>
#include <type_traits>

template <typename T>
void swap(T& a, T& b)
noexcept(noexcept(T(std::move(a))) && noexcept(a = std::move(b))) {
    T tmp(std::move(a));
    a = std::move(b);
    b = std::move(tmp);
}

/*
The swap function is declared noexcept only if both:
  T's move constructor T(std::move(a)) is noexcept
  T's move assignment a = std::move(b) is noexcept

If either operation could throw, the whole swap function is not noexcept, 
preventing false promises.
*/
```

### Example: Safe `swap` with Conditional Overload

```cpp
template<typename T>
void swap_impl(T& a, T& b, std::true_type) noexcept {
    T tmp(std::move(a));
    a = std::move(b);
    b = std::move(tmp);
}

template<typename T>
void swap_impl(T& a, T& b, std::false_type) {
    T tmp(a);
    a = b;
    b = tmp;
}

template<typename T>
void swap(T& a, T& b)
noexcept(noexcept(swap_impl(a, b,
    std::integral_constant<bool,
        std::is_nothrow_move_constructible<T>::value &&
        std::is_nothrow_move_assignable<T>::value>()))) {
    swap_impl(a, b,
        std::integral_constant<bool,
            std::is_nothrow_move_constructible<T>::value &&
            std::is_nothrow_move_assignable<T>::value>());
}
```


## Destructor and `delete` are `noexcept` by Default

Even user-defined destructors inherit `noexcept` unless explicitly marked otherwise. Example:

```cpp
// A's dtor might throw exception.
struct A { ~A() noexcept(false) {} }; 

// B's dtor by default is noexcept, but its member a is not noexcept, 
// hence B's dtor is not noexcept
struct B { A a; };  

// This will pass. Note: noexcept(B()) is testing both the dtor and ctor.
static_assert(!noexcept(B()), "B’s destructor is not noexcept");
```


## `noexcept` in the Type System (C++17)

From C++17 onwards, exception specifications are part of the function type:

```cpp
void foo();           // May throw
void bar() noexcept;  // No-throw

void (*fp)() noexcept = foo; // ERROR in C++17, not compatible type
```

The two function types are not compatible anymore, enhancing type safety.

## `noexcept` with Lambdas (C++20)

```cpp
auto f = []() noexcept { return 42; };
static_assert(noexcept(f()));

```

Before C++20, you couldn't specify noexcept on lambdas unless you wrote a full trailing return type with it.

## Support for `consteval` and Immediate Functions (C++20)
C++20's `consteval` and `constinit` features pair well with noexcept, allowing better compile-time enforcement:

```cpp
consteval int f() noexcept {
    return 42;
}
```
If such a function throws or allows throwing, the compiler gives an error — reinforcing that throwing in constant-evaluated code is forbidden.

## When to Use `noexcept`

Use `noexcept` when:

1. You **guarantee** the function won't throw (e.g., simple math, memory deallocation).
2. Throwing would be catastrophic, and `std::terminate` is acceptable.
3. You aim to **enable move optimizations** in STL containers.

Avoid using `noexcept` if there's a possibility of future changes that might introduce exceptions.


## Summary

* `noexcept` is essential for writing robust, optimized C++ code.
* Use it wisely to guide compiler optimizations and avoid surprises during template instantiations or container operations.
* From C++17 onwards, `noexcept` becomes part of the type system, enhancing type safety.

