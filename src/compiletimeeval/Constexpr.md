# `constexpr`

`constexpr` is a C++ keyword that was introduced in C++11 to allow the evaluation of expressions at compile time. It specifies that the value of a `variable` or `function` can be computed at compile time, and therefore can be used in places where a constant expression is required.

## `constexpr` vs `const`
`const` only guarantees that the value of a variable cannot be changed after it is initialized, whereas `constexpr` *guarantees* that the value of a variable can be computed at *compile time*. Therefore, `constexpr` is more powerful than `const` because it enables the use of constant expressions in more contexts.

Here are some examples of how `constexpr` can be used:

```cpp
constexpr int square(int x) {
    return x * x;
}

constexpr int x = 5;

// y is computed at compile time
constexpr int y = square(x); 

// z is computed at run time
const int z = square(6); 

constexpr int arr_size = 10;

// arr_size is a constant expression
int arr[arr_size]; 

constexpr char c = 'A' + 1;

// static_assert is a compile-time assertion
static_assert(c == 'B', "c should be equal to 'B'"); 
```

## `constexpr` function

To make a function `constexpr`, it must meet the following conditions:

1. **Must have a Non-void return type.**

```cpp
// Must return a non-void type, like int here
constexpr int square(int x) { 
    return x * x;
}
```

A `constexpr` function cannot have a return type of `void`, as it must produce a constant expression.

2. **Must be defined with `constexpr` keyword.**

```cpp
// Use the 'constexpr' keyword before the function definition
constexpr int factorial(int n) { 
    return (n <= 1) ? 1 : n * factorial(n - 1);
}
```

3. **Must not contain any definitions of variables with non-const-qualified types**, unless they are initialized with a constant expression:

```cpp
// Must use const-qualified type.
constexpr int sum(int a, int b) {
    const int result = a + b; 
    return result;
}

// Non-const variables are allowed as long as they are 
// initialized with a const expression.
// This is only valid when (a + b) produces a constant
// expression.
constexpr int add(int a, int b) {
    // 'sum' is initialized with a constant expression (a + b)
    int sum = a + b; 
    return sum;
}
```

4. **May include control structures and constructs,** such as `if`, `switch`, `for`, `while`, and `do-while` loops, provided they don't violate other `constexpr` constraints. `static_assert`, `typedef`, `using`, `if constexpr`, and `return`are also allowed.


```cpp
#include <iostream>

constexpr int factorial(int n) {
    int result = 1;
    for (int i = 1; i <= n; ++i) {
        result *= i;
    }
    return result;
}

int main() {
    constexpr auto a = factorial(5);
    return 0;
}
```

The generated assembly code confirms that variable `a` is evaluated at the compile time:

```asm
main:                                 
        push    rbp
        mov     rbp, rsp
        mov     dword ptr [rbp - 4], 0
        mov     dword ptr [rbp - 8], 120
        xor     eax, eax
        pop     rbp
        ret
```

5. **Can only call other `constexpr` functions.**

```cpp
constexpr int square(int x) {
    return x * x;
}

// Only call other constexpr functions
constexpr int square_sum(int a, int b) {
    return square(a) + square(b); 
}
```

6. **Must produce constant expressions when called with constant expressions.**

```cpp
#include <iostream>

constexpr int power(int base, int exponent) {
    int result = 1;
    for (int i = 0; i < exponent; ++i) {
        result *= base;
    }
    return result;
}

int main() {
    constexpr auto b = power(2, 5);
    return 0;
}
```

```asm
main:
        push    rbp
        mov     rbp, rsp
        mov     dword ptr [rbp - 4], 0
        mov     dword ptr [rbp - 8], 32
        xor     eax, eax
        pop     rbp
        ret
```

## Constructor

`constexpr` constructors in C++ are used to create constant expressions of user-defined types during compile-time. They are useful because they allow for more efficient code by performing computations at compile-time and enabling the usage of user-defined types in other `constexpr` contexts.

`constexpr` constructors were introduced in C++11, along with the general `constexpr` specifier.

Conditions (or constraints) for `constexpr` constructors:

1. The constructor must not be a copy or move constructor.
2. Every expression and construct used in the constructor must be a constant expression.
3. Every base class and member of the class must have a `constexpr` constructor.
4. Every constructor call and full-expression in the constructor's member initializers must be a constant expression.

Here's an example of a `constexpr` constructor:

```cpp
class Point {
public:
    constexpr Point(int x, int y) : x_(x), y_(y) {
        // Since C++14, the body of a constexpr constructor can include
        // other constructs like if statements and loops, as long as they
        // meet the constexpr requirements.
        if (x_ < 0) { x_ = 0; }
        if (y_ < 0) { y_ = 0; }
    }

    constexpr int getX() const { return x_; }
    constexpr int getY() const { return y_; }

private:
    int x_;
    int y_;
};

int main() {
    constexpr Point p1(1, 2);
    constexpr int x = p1.getX();
    constexpr int y = p1.getY();
}
```

### *Member initializer*
When defining a `constexpr` constructor,  the constructor's member initializer list must only contain constant expressions. This means that when initializing member variables or calling base class constructors, the expressions used must be evaluable compile-time. This is required to *guarantee* that the object can be constructed as a constant expression during compile-time.

Here's an example to illustrate this requirement:

```cpp
class Base {
public:
    constexpr Base(int value) : value_(value) {}

private:
    int value_;
};

class Derived : public Base {
public:
    // Both initializers are constant expressions
    constexpr Derived(int baseValue, int derivedValue) 
        : Base(baseValue), derivedValue_(derivedValue) {} // Both initializers are constant expressions

private:
    int derivedValue_;
};

int main() {
    // Constructed as a constant expression during compile-time
    constexpr Derived d(1, 2); 
}
```

## Destructor

If a class has a `constexpr` constructor and is meant to be used in a `constexpr` context, then the destructor should be trivial. A trivial destructor does not perform any custom actions, allowing the object to be safely used in a `constexpr` context. 

> A destructor is considered trivial if:
> 1. It is not user-provided (i.e., the compiler generates the destructor implicitly).
> 2. The class has no virtual functions or virtual base classes.
> 3. All direct base classes have trivial destructors.
> 4. For all non-static data members of the class that are of class type (or array thereof), each such class has a trivial destructor.

Here's an example of a class with a `constexpr` constructor and a trivial destructor:

```cpp
class Point {
public:
    constexpr Point(int x, int y) : x_(x), y_(y) {}

    // Destructor is trivial (not user-provided and no custom actions)
    // ~Point() = default;

    constexpr int getX() const { return x_; }
    constexpr int getY() const { return y_; }

private:
    int x_;
    int y_;
};

int main() {
    constexpr Point p(1, 2);
}
```

