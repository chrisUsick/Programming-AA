# commands
rm build/*
cp src/* build/
pandoc --smart -o body.tex body.md
## full build command
rm build/* && pandoc --smart -o src/body.tex src/body.md && cp src/* build/ && cd build/ && pdflatex --shell-escape main
