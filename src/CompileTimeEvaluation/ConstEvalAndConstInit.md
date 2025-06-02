# `consteval` and `constinit`

## `consteval`

`consteval` keyword was introduced in C++20 as a new kind of function declaration known as a "consteval function." A consteval function is designed to be evaluated (and must be evaluable) at compile-time within constant expressions.

To be valid, a consteval function must have a literal type, meaning that its type can be used within a constant expression. Additionally, the body of a consteval function must be fully evaluated at compile-time, without any runtime execution. **If these requirements are not met, the compiler will generate an error**.

Here's an example of a consteval function:

```cpp
consteval int square(int x) {
    return x * x;
}
```

### Difference between `consteval` and `constexpr`

```cpp
constexpr int add(int x, int y) {
    return x + y;
}

consteval int multiply(int x, int y) {
    return x * y;
}

int main() {
    constexpr int result1 = add(3, 4);        // Evaluates at compile-time
    consteval int result2 = multiply(5, 6);   // Evaluates at compile-time

    int x = 2, y = 3;
    int result3 = add(x, y);                  // Evaluates at runtime

    return 0;
}
```

In the code above, the `add` function is declared as `constexpr`, allowing it to be evaluated at both compile-time and runtime. The `multiply` function is declared as `consteval`, ensuring that it is evaluated strictly at compile-time within constant expressions.

## `constinit`

The `constinit` specifier is introduced in C++20 to qualify a variable with static storage duration. A variable marked with `constinit` specifier must be initialized with compile-time constant expressions and it guarantees that the initialization will be done during the static initialization phase. It prevents the variables with static storage duration to be initialized at runtime.

- `constinit` cannot be used together with `constexpr` or `consteval` as `constinit` is used for static initialization of variables, which happens before the program starts the execution, whereas constexpr and consteval are used to evaluate the expression at compile time.

- `constinit` forces constant initialization of static or thread-local variables. It can help to limit static order initialization fiasco by using precompiled values and well-defined order rather than dynamic initialization and linking order

- `constinit` does not mean that the object is immutable. `constinit` variable cannot be used in constant expressions

```cpp
#include <array>

// init at compile time
constexpr int compute(int v) { return v*v*v; }
constinit int global = compute(10);

// won't work:
// constinit int another = global;

int main() {
    // but allow to change later...
    global = 100;

    // global is not constant!
    // std::array<int, global> arr;
}
```

```assembly
main:
 push   rbp
 mov    rbp,rsp
 mov    DWORD PTR [rip+0x2efc],0x64        # 404010 <global>
 mov    eax,0x0
 pop    rbp
 ret
 nop    DWORD PTR [rax+rax*1+0x0]
 ```

The following table summaries all `const` specifiers ([credit: Bartłomiej Filipek](https://www.cppstories.com/2022/const-options-cpp20/))

| Keyword    | On Auto Variables | On Static/Thread_Local Variables | On Functions          | On Constant Expressions |
|------------|------------------|----------------------------------|-----------------------|-------------------------|
| `const`      | Yes              | Yes                              | As const member functions | Sometimes                |
| `constexpr`  | Yes or Implicit (in constexpr functions) | Yes          | To indicate constexpr functions | Yes                 |
| `consteval`  | No               | No                               | To indicate consteval functions | Yes (as a result of a function call) |
| `constinit`  | No               | To force constant initialization | No                    | No, a `constinit` variable is not a constexpr variable |
