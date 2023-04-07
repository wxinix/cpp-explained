# Preface

## The Evolution of C++: From Classical to Modern

Since its inception as "C with classes," the precursor to the C++ programming language, C++ has experienced numerous significant revisions and improvements. The language is now standardized by ISO JTC1/SC22/WG21, a working group composed of C++ experts from various countries. The first standardized version of C++ was ISO/IEC 14882:1998, commonly known as C++98. The next edition, ISO/IEC 14882:2003, was a minor revision that addressed issues found in C++98.

The true revolution of C++ arrived with ISO/IEC 14882:2011, also known as C++11 or C++0x. Officially released in 2011, it had been delayed longer than originally planned, leading developers to joke about the delay by dubbing it "C++0B," with the hexadecimal B representing the release year. C++11 is considered a watershed moment in the language's evolution, marking the transition from classical to modern C++. It introduced many important additions to both the core language and the standard library, including rvalue references/move semantics, auto type deduction, uniform initialization syntax using {} lists, lambdas, variadic templates, SFINAE rules, and various smart pointer classes, among other valuable features for crafting robust C++ programs.

A small extension to C++11 was introduced in ISO/IEC 14882:2014. This was followed by another major revision, ISO/IEC 14882:2017, which added notable features like std::any, std::variant, and std::optional classes to the standard library.

C++20, i.e., ISO/IEC 14882:2020 was officially published on 15 December 2020, representing the latest major revision. The most welcomed core language features of C++20 include concepts for generic type constraints, modules for improved expression of program physical modules, and coroutines for non-preemptive multitasking. Among the many new standard library features, the ranges library is particularly exciting, as it enables functional programming with "pipeable" functions similar to F#, my favorite .NET language.

Given the impact and changes brought about by C++11/14/17/20, it's clear that pre-2011 C++ and post-2011 C++ are fundamentally different languages. This distinction is reflected in the terms "Classical C++" represented by C++98 and "Modern C++" represented by C++11 and later. Learning the reimagined modern C++ as a new language is necessary, whether it's approached with enthusiasm or apprehension.

C++ was originally designed to be backward compatible with C, allowing for C-style programming with raw pointers, arrays, null-terminated strings, and more. While these features offer performance benefits, they can also introduce bugs and complexity. The evolution of C++ has focused on reducing the need for C-style idioms, but they remain available when necessary. Modern C++ is simpler, safer, more elegant, and retains its speed.

## Who this book is for
This book, aimed at readers with basic C++ knowledge, explores new features in Modern C++. Most chapters are beginner-friendly, while some need extra focus. Advanced meta-template programming topics may require multiple readings but can be skipped initially. Beginners should refer to other C++ books for fundamental guidance.

## What this book covers
This book focuses on helping readers understand the rationale behind new C++11 to C++20 features, discussing past C++ limitations, and examining how these features address and optimize those issues. Wherever necessary, it also explains how new features are implemented in compilers. Code samples are tested using GCC, Clang, and MSVC. 



