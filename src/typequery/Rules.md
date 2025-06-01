# Type Query Rules in C++

This section outlines the official deduction rules for `decltype`, along with examples, clarifications about cv-qualifiers, and the role of `decltype(auto)`.


## `decltype(e)` Deduction Rules

When `e` is an expression and `T` is its type, the type deduced by `decltype(e)` follows five core rules:

1. **Identifier or Class Member Access (without parentheses)**
   If `e` is an unparenthesized identifier or class member access, `decltype(e)` is simply `T`. This excludes overloaded function names and structured bindings.

2. **Function or Functor Call**
   If `e` is a function call or functor invocation, `decltype(e)` is the function's return type.

3. **Lvalue**
   If `e` is an lvalue of type `T`, `decltype(e)` is `T&`.

4. **Xvalue (expiring value)**
   If `e` is an xvalue of type `T`, `decltype(e)` is `T&&`.

5. **Prvalue (pure rvalue)**
   In all other cases, `decltype(e)` is simply `T`.

### Standard Examples

```cpp
const int&& foo();
int i;
struct A { double x; };
const A* a = new A();

decltype(foo());    // const int&& (rules 2 and 4)
decltype(i);        // int         (rule 1)
decltype(a->x);     // double      (rule 1)
decltype((a->x));   // const double& (rule 3 — parenthesized, so it's an lvalue)
```



## Additional Deduction Examples

```cpp
int i;
int *j;
int n[10];
const int&& foo();

decltype(static_cast<short>(i)); // short (prvalue)
decltype(j);                     // int*
decltype(n);                     // int[10]
decltype(foo);                   // const int&&() (function type)

struct A {
    int operator() () { return 0; }
};
A a;
decltype(a()); // int (functor call)
```

### More Complex Cases

```cpp
int i;
int *j;
int n[10];

decltype(i = 0);                 // int& (assignment returns lvalue)
decltype(0, i);                  // int& (comma operator, result is i — an lvalue)
decltype(i, 0);                  // int  (comma operator, result is 0 — a pure rvalue)
decltype(n[5]);                  // int& (array element is an lvalue)
decltype(*j);                    // int& (dereference of pointer is lvalue)
decltype(static_cast<int&&>(i)); // int&& (xvalue)
decltype(i++);                   // int  (post-increment yields prvalue)
decltype(++i);                   // int& (pre-increment yields lvalue)
decltype("hello world");         // const char(&)[12] (string literal is lvalue array)
```



## cv-Qualifier Deduction Behavior

In general, `decltype(e)` preserves the `const` and `volatile` (cv) qualifiers of `e`. For example:

```cpp
const int i = 0;
decltype(i); // const int
```

However, **there are exceptions**, particularly for class member access. If `e` is an unparenthesized member access expression, the cv-qualifiers of the object are **not** propagated:

```cpp
struct A { double x; };
const A* a = new A();
decltype(a->x);   // double (cv-qualifier on `a` ignored)
decltype((a->x)); // const double& (parenthesized — now cv is considered)
```

In summary:

* Unparenthesized member access: cv-qualifiers **not** preserved.
* Parenthesized expression: cv-qualifiers **are** preserved.



## `decltype(auto)`

Introduced in **C++14**, `decltype(auto)` merges the behavior of `decltype` and `auto`. It tells the compiler to deduce the type using **`decltype` rules**, not `auto` rules.

> **Note:** `decltype(auto)` must be used alone in a declaration. It cannot be combined with pointer/reference/cv-qualifiers.

### Comparison Examples:

```cpp
int i;
int&& f();

auto x1 = i;                // int
decltype(auto) x2 = i;      // int

auto x3 = (i);              // int
decltype(auto) x4 = (i);    // int&

auto x5 = f();              // int
decltype(auto) x6 = f();    // int&&

auto x7 = {1, 2};           // std::initializer_list<int>
decltype(auto) x8 = {1, 2}; // ❌ Error: not a single expression

auto* p1 = &i;              // int*
decltype(auto)* p2 = &i;    // ❌ Error: decltype(auto) must appear alone
```

### Return Type Use Case

Before C++14, returning references required a trailing return type:

```cpp
template<class T>
auto return_ref(T& t) -> T& { return t; }
```

With `decltype(auto)`, this becomes:

```cpp
template<class T>
decltype(auto) return_ref(T& t) {
    return t; // preserves reference type
}
```

### C++17: `decltype(auto)` as a Non-Type Template Parameter

In C++17, `decltype(auto)` can also be used as a **non-type template parameter**, with deduction rules matching `decltype`.

```cpp
#include <iostream>

template<decltype(auto) N>
void f() {
    std::cout << N << std::endl;
}

static const int x = 11;
static int y = 7;

int main() {
    f<x>();     // N deduced as const int
    f<(x)>();   // N deduced as const int&
    f<y>();     // ❌ Error: y is not a constant expression
    f<(y)>();   // N deduced as int&
}
```
