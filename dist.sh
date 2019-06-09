rm -rf dist;
mkdir dist;
echo "transpiling..."
BABEL_ENV=production npx babel src --out-dir dist;
echo "...done!"