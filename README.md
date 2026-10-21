# flaky-demo-jest

Demo repository for exercising a flaky-test detector against GitHub Actions logs (Jest).

- `src/timeparse.test.js` contains stable tests plus three intentionally flaky tests
  (`flaky: ...`) that fail with ~40% probability per run.
- `.github/workflows/tests.yml` (`Tests` → `unit-tests`) runs the suite on every push.
  Re-running a failed run lets the detector observe pass-on-retry and same-SHA mixed
  outcomes in the standard Jest reporter output (`FAIL path`, `● Suite › test`).
- `.github/workflows/broken.yml` (`Broken suite` → `broken-suite`) runs
  `broken/broken.test.js`, which always fails, to verify the detector classifies
  consistently failing jobs as broken rather than flaky.
