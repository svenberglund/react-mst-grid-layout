echo "cleaning up..."
rm -rf dist;
mkdir dist;
echo "transpiling..."
BABEL_ENV=production npx ./node_modules/@babel/cli/bin/babel.js src --out-dir dist;
echo "...done!"