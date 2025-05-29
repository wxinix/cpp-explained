# Various Type Deduction Mechanisms

Modern C++ includes multiple mechanisms for type deduction, enabling more concise and expressive code. The table below summarizes these features and their respective introductions into the language standard:


| Mechanism                          | Keyword(s)                   | Description                                              | Introduced |
| ---------------------------------- | ---------------------------- | -------------------------------------------------------- | ---------- |
| **Function template deduction**    | template parameters          | Deduces template types from function arguments           | C++98      |
| **Auto type deduction**            | `auto`                       | Deduces type from initializer                            | C++11      |
| **Exact expression type**          | `decltype`, `decltype(auto)` | Queries the exact type of an expression (w/o evaluating) | C++11/14   |
| **Return type deduction**          | `auto`, `decltype(auto)`     | Deduces function return type                             | C++14      |
| **Lambda parameter deduction**     | `auto` in lambda             | Deduces parameter types in generic lambdas               | C++14      |
| **Structured bindings**            | `auto` with `[ ]`            | Unpacks structured types like tuples                     | C++17      |
| **Class template arg deduction**   | CTAD                         | Deduces template types from constructor args             | C++17      |
| **Non-type template deduction**    | `auto`                       | Deduce type of constant template parameter               | C++17      |
| **Abbreviated function templates** | `auto` in function param     | Template parameter deduction in normal function syntax   | C++20      |
| **Constrained deduction**          | Concepts + `auto`            | Adds semantic constraints to type deduction              | C++20      |
| **Aggregate member with auto**     | `auto` in struct/class field | Supports `auto` members with initializer in aggregates   | C++20      |
| **Compile-time enforcement**       | `consteval`, `constinit`     | Restricts deduction to compile-time context              | C++20      |

---

## Examples

### Auto Type Deduction

```cpp
int i = 42;
auto x = i;   // x is deduced as int
```
The auto keyword causes the compiler to deduce x as int, based on the initializer.

### Decltype Type Query

```cpp
int i = 42;
decltype(i) y = i;   // y is also int
auto z = (i);         // auto is int, decltype((i)) is int&
```
`decltype` determines the type of an expression without evaluating it. Parentheses can influence whether a value or reference type is deduced.

### Function Template Deduction

```cpp
template<typename T>
void print(T value) {
    std::cout << value << std::endl;
}

print(10);   // T is deduced as int
```
Template arguments are deduced from the function call's parameter types.

### Return Type Deduction

```cpp
auto add(int a, int b) {
    return a + b;   // return type deduced as int
}
```
The compiler infers the return type from the return expression when auto is used.

### Structured Bindings

```cpp
std::tuple<int, double> t{1, 2.0};
auto [a, b] = t;  // a is int, b is double
```
Structured bindings destructure compound types into named variables with deduced types.

### Lambda Parameter Deduction

```cpp
auto lambda = [](auto a, auto b) {
    return a + b;
};
```
Generic lambdas deduce parameter types during invocation, functioning similarly to templated callables.

### Class Template Argument Deduction (CTAD)

```cpp
template<typename T>
struct Wrapper {
    T value;
    Wrapper(T v) : value(v) {}
};

Wrapper w(123);  // T deduced as int
```
Constructor arguments guide the deduction of template parameters, eliminating the need for explicit specification.

### Non-Type Template Parameter (NTTP) Deduction


```cpp
 #include <iostream>

template<auto N>
void f() {
    std::cout << N << std::endl;
}

int main() {
    f<5>();     // OK: N is deduced as int
    f<'c'>();   // OK: N is deduced as char
    f<5.0>();   // ❌ Error: double is not a valid non-type template parameter
}
```
Starting with C++17, non-type template parameters can use auto to infer both the value and the type. In C++20, non-type template parameters (NTTPs) were enhanced to allow a broader set of types, but floating-point types (float, double, long double) are still not allowed as non-type template parameters.

For example, the following class `Color` is a literal class type with structural semantics, and can be used as NTTP:
```cpp
struct Color {
    int r, g, b;
    constexpr bool operator==(const Color&) const = default;
};

template<Color C>
struct Widget {
    void print() {
        std::cout << C.r << ", " << C.g << ", " << C.b << "\n";
    }
};

int main() {
    Widget<Color{255, 255, 0}> w; // OK in C++20!
    w.print();
}

```
But the following can not:

```cpp
struct NonStructural {
    double d;  // ❌ double is not allowed in structural types, due to comparison and representation issues.
    constexpr bool operator==(const NonStructural&) const = default;
};

template<NonStructural N>
struct T {};  // ❌ Error

```

### Abbreviated Function Templates

```cpp
void log(auto x) {
    std::cout << x;
}
```
Function templates can be expressed using auto in parameter declarations, reducing boilerplate syntax.

### Concepts and Constrained Deduction

```cpp
template<typename T>
concept Printable = requires(T t) { std::cout << t; };

void log(Printable auto x) {
    std::cout << x;
}
```
Concepts restrict template parameters to types satisfying specified requirements. The example ensures that x is printable to an output stream.

### Aggregate Initialization with Deduction

```cpp
struct Data {
    auto x = 0;  // allowed in C++20 with brace initialization
};
```
The use of auto in aggregate member declarations is permitted when accompanied by a default initializer.

### `consteval` / `constinit` Impact

```cpp
consteval int square(int x) { return x * x; }
```
The consteval specifier enforces that the function is evaluated at compile time. This feature is used to guarantee constexpr behavior.

---

### Example Pitfall: Object Slicing

```cpp
Base* d = new Derived();
auto b = *d;  // b is Base, object slicing occurs
b.f();        // Calls Base::f(), not Derived::f()
```
When deducing by value from a base pointer, object slicing occurs, stripping derived-type behavior.

To preserve polymorphic behavior:

```cpp
auto& b = *d; // b is Base&
b.f();        // Calls Derived::f()
```
