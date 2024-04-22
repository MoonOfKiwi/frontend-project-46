# Project "Difference Generator"

### Hexlet tests and linter status:
[![Actions Status](https://github.com/MoonOfKiwi/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/MoonOfKiwi/frontend-project-46/actions)
[![Actions Status](https://github.com/MoonOfKiwi/frontend-project-46/actions/workflows/ci.yml/badge.svg)](https://github.com/MoonOfKiwi/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/977ff8353768394634fb/maintainability)](https://codeclimate.com/github/MoonOfKiwi/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/977ff8353768394634fb/test_coverage)](https://codeclimate.com/github/MoonOfKiwi/frontend-project-46/test_coverage)

## Description
Difference generator determines the difference between two data structures and shows the result in the selected format.

## Features
* Support for JSON, YAML configuration file formats
* Customizable output format: stylish, plain or JSON
* Recursive comparison of nested structures

## Requirements
[Node.js](https://nodejs.org/en/download)

## Setup

```bash
git clone 'git@github.com:MoonOfKiwi/frontend-project-46.git'
make install
```

## Usage

```bash
gendiff [options] <filepath1> <filepath2>

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           output usage information
```

## Examples

### Run Gendiff: data type - JSON, format - stylish
[![asciicast](https://asciinema.org/a/zw1RvpJVqv0tuFds3T9dVNxLn.svg)](https://asciinema.org/a/zw1RvpJVqv0tuFds3T9dVNxLn)

### Run Gendiff: data type - YML, format - stylish
[![asciicast](https://asciinema.org/a/LiOtVq9WK4cq9EZgL3DvtBmEj.svg)](https://asciinema.org/a/LiOtVq9WK4cq9EZgL3DvtBmEj)

### Run Gendiff: data type - nested JSON, format - stylish
[![asciicast](https://asciinema.org/a/ltkvZ9ijPQuYp2VXNgoBdTLbG.svg)](https://asciinema.org/a/ltkvZ9ijPQuYp2VXNgoBdTLbG)

### Run Gendiff: data type - nested YAML, format - plain
[![asciicast](https://asciinema.org/a/m6ox5ts6u09UEdozSMPGkc8cr.svg)](https://asciinema.org/a/m6ox5ts6u09UEdozSMPGkc8cr)

### Run Gendiff: data type - nested YAML, format - JSON
[![asciicast](https://asciinema.org/a/TgOVUxX39uH4UuOVLMoFrnZ2x.svg)](https://asciinema.org/a/TgOVUxX39uH4UuOVLMoFrnZ2x)
