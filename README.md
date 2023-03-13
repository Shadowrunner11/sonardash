# SPA Reporting Sonar Qube

---

## Introduction

This project creates reports from Sonar Qube Api data

## Testing

Take in consideration that you can turn on logging data from responses and request
when testing fetching services since, default client is axios and tests are running on node
by adding this to .env file or to envs in the process you are running tests

> IS_LOGGER_ENABLED=1

Of course, fetching data with node is rather different from browser implementation,
take that in consideration while running tests. There is a complete wiki why we
choosed this course of action for unit testing (yeah, CORS make us sleep safer and mocking data is always and option,
but hey, we were needing REAL data to iterate in a agile way)

## Roadmap

- [ ] Write tests (some of them are already implemented)
- [ x ] Fetch authors data with axios
- [ ] Fetch authors data with react query
- [ x ] Implementing loggers
- [ x ] Interface seggreation to fetch data
- [ ] Add documentation
- [ ] Converto to mono repo to work with docusaurs?
- [ x ] Fetch issues paginated with axios
- [ ] Fetch issues with react query
- [ ] Create custom List View to issues
- [ ] Wire authors to filters
- [ ] Add dark mode (evilish people does not add dark mode)

## Note

We may migrate all fetching logic to a backend so there is no loose on implementing it meanwhile herem again
there is a wiki explaining how we would solve the problem
