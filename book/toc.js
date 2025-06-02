// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="PREFACE.html">Preface</a></li><li class="chapter-item expanded "><a href="FundamentalDataTypes/index.html"><strong aria-hidden="true">1.</strong> Fundamental Data Types</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="FundamentalDataTypes/IntTypes.html"><strong aria-hidden="true">1.1.</strong> Integer Types</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="FundamentalDataTypes/IntTypes_longlong.html"><strong aria-hidden="true">1.1.1.</strong> long long</a></li></ol></li><li class="chapter-item expanded "><a href="FundamentalDataTypes/CharTypes.html"><strong aria-hidden="true">1.2.</strong> Character Types</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="FundamentalDataTypes/CharTypes_CharSetsEncodings.html"><strong aria-hidden="true">1.2.1.</strong> Sets and Encodings</a></li><li class="chapter-item expanded "><a href="FundamentalDataTypes/CharTypes_NewCharTypes.html"><strong aria-hidden="true">1.2.2.</strong> New Types</a></li><li class="chapter-item expanded "><a href="FundamentalDataTypes/CharTypes_StringLiteralCat.html"><strong aria-hidden="true">1.2.3.</strong> Automatic Concatenation</a></li><li class="chapter-item expanded "><a href="FundamentalDataTypes/CharTypes_LibrarySuppor.html"><strong aria-hidden="true">1.2.4.</strong> Library Support</a></li></ol></li></ol></li><li class="chapter-item expanded "><a href="MemoryAlignment/index.html"><strong aria-hidden="true">2.</strong> Memory Alignment</a></li><li class="chapter-item expanded "><a href="Literals/index.html"><strong aria-hidden="true">3.</strong> Literals</a></li><li class="chapter-item expanded "><a href="Initialization/index.html"><strong aria-hidden="true">4.</strong> Initialization</a></li><li class="chapter-item expanded "><a href="CompileTimeEvaluation/index.html"><strong aria-hidden="true">5.</strong> Compile Time Evaluation</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="CompileTimeEvaluation/Constexpr.html"><strong aria-hidden="true">5.1.</strong> constexpr</a></li><li class="chapter-item expanded "><a href="CompileTimeEvaluation/NumericLimit.html"><strong aria-hidden="true">5.2.</strong> std::numeric_limits</a></li><li class="chapter-item expanded "><a href="CompileTimeEvaluation/MathFunctions.html"><strong aria-hidden="true">5.3.</strong> Math functions</a></li><li class="chapter-item expanded "><a href="CompileTimeEvaluation/Lambdas.html"><strong aria-hidden="true">5.4.</strong> Lambdas</a></li><li class="chapter-item expanded "><a href="CompileTimeEvaluation/InliningConstExpr.html"><strong aria-hidden="true">5.5.</strong> Inlining constexpr</a></li><li class="chapter-item expanded "><a href="CompileTimeEvaluation/ConditionalCompilation.html"><strong aria-hidden="true">5.6.</strong> Conditional Compilation </a></li><li class="chapter-item expanded "><a href="CompileTimeEvaluation/VirtualFunctions.html"><strong aria-hidden="true">5.7.</strong> Virtual Functions</a></li><li class="chapter-item expanded "><a href="CompileTimeEvaluation/TryCatch.html"><strong aria-hidden="true">5.8.</strong> try-catch </a></li><li class="chapter-item expanded "><a href="CompileTimeEvaluation/DefaultInit.html"><strong aria-hidden="true">5.9.</strong> Initialization of constexpr Object</a></li><li class="chapter-item expanded "><a href="CompileTimeEvaluation/ConstEvalAndConstInit.html"><strong aria-hidden="true">5.10.</strong> consteval and constinit</a></li><li class="chapter-item expanded "><a href="CompileTimeEvaluation/StdIsConstant.html"><strong aria-hidden="true">5.11.</strong> std::is_constant_evaluated</a></li><li class="chapter-item expanded "><a href="CompileTimeEvaluation/OtherEnhancements.html"><strong aria-hidden="true">5.12.</strong> Other Enhancements</a></li></ol></li><li class="chapter-item expanded "><a href="TypeDeduction/index.html"><strong aria-hidden="true">6.</strong> Type Deduction</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="TypeDeduction/Introduction.html"><strong aria-hidden="true">6.1.</strong> Introduction</a></li><li class="chapter-item expanded "><a href="TypeDeduction/Mechnisms.html"><strong aria-hidden="true">6.2.</strong> Mechanisms</a></li><li class="chapter-item expanded "><a href="TypeDeduction/Rules.html"><strong aria-hidden="true">6.3.</strong> Rules</a></li><li class="chapter-item expanded "><a href="TypeDeduction/BestPractices.html"><strong aria-hidden="true">6.4.</strong> Best Practices</a></li></ol></li><li class="chapter-item expanded "><a href="TypeIntrospection/index.html"><strong aria-hidden="true">7.</strong> Type Introspection</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="TypeIntrospection/Introduction.html"><strong aria-hidden="true">7.1.</strong> Introduction</a></li><li class="chapter-item expanded "><a href="TypeIntrospection/Mechnisms.html"><strong aria-hidden="true">7.2.</strong> Mechanisms</a></li><li class="chapter-item expanded "><a href="TypeIntrospection/Rules.html"><strong aria-hidden="true">7.3.</strong> Rules</a></li><li class="chapter-item expanded "><a href="TypeIntrospection/BestPractices.html"><strong aria-hidden="true">7.4.</strong> Best Practices</a></li></ol></li><li class="chapter-item expanded "><a href="Namespace/index.html"><strong aria-hidden="true">8.</strong> Namespace</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="Namespace/InlineNamespace.html"><strong aria-hidden="true">8.1.</strong> Inline Namespace</a></li><li class="chapter-item expanded "><a href="Namespace/NewNestedNamespaceSyntax.html"><strong aria-hidden="true">8.2.</strong> New Nested Namespace Syntax</a></li><li class="chapter-item expanded "><a href="Namespace/UnnamedNamespace.html"><strong aria-hidden="true">8.3.</strong> Unnamed Namespace</a></li><li class="chapter-item expanded "><a href="Namespace/MergedNamespace.html"><strong aria-hidden="true">8.4.</strong> Merged Namespace</a></li><li class="chapter-item expanded "><a href="Namespace/GlobalNamespace.html"><strong aria-hidden="true">8.5.</strong> Global Namespace</a></li></ol></li><li class="chapter-item expanded "><a href="ProgramStructure/index.html"><strong aria-hidden="true">9.</strong> Program Structure</a></li><li class="chapter-item expanded "><a href="ControlFlow/index.html"><strong aria-hidden="true">10.</strong> Control Flow</a></li><li class="chapter-item expanded "><a href="ExceptionAndAssertation/index.html"><strong aria-hidden="true">11.</strong> Exceptions and Assertion</a></li><li class="chapter-item expanded "><a href="Class/index.html"><strong aria-hidden="true">12.</strong> Class</a></li><li class="chapter-item expanded "><a href="ValueSyntax/index.html"><strong aria-hidden="true">13.</strong> Value Syntax</a></li><li class="chapter-item expanded "><a href="TemplateAndGenericProgramming/index.html"><strong aria-hidden="true">14.</strong> Template and Generic Programming</a></li><li class="chapter-item expanded "><a href="RangeAndView/index.html"><strong aria-hidden="true">15.</strong> Ranges and View</a></li><li class="chapter-item expanded "><a href="Concurrency/index.html"><strong aria-hidden="true">16.</strong> Concurrency</a></li><li class="chapter-item expanded "><a href="AttributeAndPreprocessor/index.html"><strong aria-hidden="true">17.</strong> Attributes and Preprocessor</a></li><li class="chapter-item expanded "><a href="Optimizations/index.html"><strong aria-hidden="true">18.</strong> Optimizations</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
