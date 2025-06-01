# Type Query Mechanisms

C++ provides several mechanisms to query the type of expressions at compile time. The primary ones include `decltype`, `typeid`, `std::declval`, and type traits from `<type_traits>`.


## 1. Type Specifier `decltype` 

`decltype(expr)` yields the type of the expression `expr` without evaluating it. This makes it useful for examining the type of variables, function calls, or even complex expressions in a safe way during compilation.

### Example:
```cpp
int a = 5;
decltype(a) b = 10; // b is int
```

Used for data member:

```cpp
struct S1 {
    int x1;
    decltype(x1) x2;
    double x3;
    decltype(x2 + x3) x4;
};
```

Used in function parameter list.
```cpp
int x1 = 0;
decltype(x1) sum(decltype(x1) a1, decltype(a1) a2)
{
    return a1 + a2;
}
auto x2 = sum(5, 10);
```

### Note on Reference and `const` Preservation:
```cpp
const int& r = a;
decltype(r) x = a; // x is const int&
```
The following code would fail:
```cpp
template<class T>
auto return_ref(T& t)
{
    return t;
}

int x1 = 0;

static_assert(
    std::is_reference_v<decltype(return_ref(x1))>
);
```
The following would be OK:
```cpp
template<class T>
auto return_ref(T& t)->decltype(t)
{
    return t;
}

int x1 = 0;

static_assert(
    std::is_reference_v<decltype(return_ref(x1))>
);
```

`decltype` preserves the exact type of the expression, including reference and cv-qualifiers.


## 2. Type Identification Operator `typeid` (Runtime) 

`typeid(expr)` yields a reference to a `std::type_info` object representing the type of the expression. It is evaluated at runtime and is primarily useful when working with polymorphic types.

### Example:
```cpp
#include <iostream>
#include <typeinfo>

void printType(int x) {
    std::cout << "Type: " << typeid(x).name() << '\n';
}
```

**Note:** When used on polymorphic types through a base pointer or reference, `typeid` reveals the dynamic type. Otherwise, it yields the static type.

### Note

1. **Return Value Lifetime**  
   The return value of `typeid` is a **lvalue** reference to a `const std::type_info` object.  Its **lifetime is extended to the entire lifetime of the program** — it is safe to store the reference or pointer.

2. **No Copy Constructor**  
   `std::type_info` has a **deleted copy constructor**, so it cannot be copied. Attempting to assign it directly as a value will result in a compilation error.

   ```cpp
   auto t1 = typeid(int);     // ❌ Error: copy constructor is deleted
   auto& t2 = typeid(int);    // ✅ OK: t2 is a const std::type_info&
   auto* t3 = &typeid(int);   // ✅ OK: t3 is a const std::type_info*
   ```

3. **CV-Qualifiers Ignored**
    `typeid` always ignores const and volatile qualifiers when comparing types:
    ```cpp
    const int ci = 42;
    bool same = (typeid(int) == typeid(ci)); // true
    ```
    This means, `typeid(T) == typeid(const T) == typeid(volatile T) == typeid(const volatile T)`
## 3. Function Template `std::declval<T>()`

`std::declval<T>()` is a utility from `<utility>` that simulates an rvalue of type `T` in unevaluated contexts. It is primarily used in conjunction with `decltype` to query types that depend on operations without needing an actual object of type `T`.

### Example:
```cpp
#include <utility>

/*
This works even if T has no default constructor, because the expression is unevaluated
— std::declval<T>() just returns a value of type T&& without constructing anything.
*/
template <typename T>
auto getReturnType() -> decltype(std::declval<T>().foo());
```

```cpp
/*
This would be invalid because:
    - T is a type, and T.foo() is not a valid syntax (you can't call .foo() on a type).
    - There's no instance of T to call foo() on.
    - Even if T had a static member function foo(), that would be accessed as T::foo().
*/
template <typename T>
auto getReturnType() -> decltype(T.foo()); // ❌ Error
```

This technique is common in SFINAE and type trait definitions.

| Expression                          | Works?                        | Reason                                                 |
| ----------------------------------- | ----------------------------- | ------------------------------------------------------ |
| `decltype(std::declval<T>().foo())` | ✅                             | Simulates an rvalue of type `T` in unevaluated context |
| `decltype(T.foo())`                 | ❌                             | Invalid syntax: `T` is a type, not an object           |
| `decltype(T::foo())`                | ✅ (only if `foo()` is static) | Accesses static member function                        |


## 4. Type Traits (`<type_traits>`)

The C++ standard library provides a wide range of type traits in the `<type_traits>` header for compile-time type inspection and transformation.

### Examples:
```cpp
#include <type_traits>

std::is_integral<int>::value          // true
std::is_same<int, long>::value        // false
std::remove_reference<int&>::type     // int
std::decay<const int&>::type          // int
```

Type traits enable generic code to adapt behavior based on type properties or to transform types as needed.


### Summary

| Mechanism            | Compile-Time | Runtime | Key Use Cases                          |
|----------------------|--------------|---------|----------------------------------------|
| `decltype(expr)`     | ✅           | ❌      | Exact type inference of expressions    |
| `typeid(expr)`       | ❌           | ✅      | Runtime type information, polymorphism |
| `std::declval<T>()`  | ✅           | ❌      | Simulated expressions in decltype      |
| Type Traits          | ✅           | ❌      | Type inspection, manipulation, SFINAE  |

