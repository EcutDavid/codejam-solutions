#include <bits/stdc++.h>
using namespace std;

typedef double f64;
typedef long long i64;
typedef int i32;
typedef pair<i32, i32> pi32;
typedef unsigned long long u64;
typedef unsigned int u32;
typedef vector<i32> vi32;
typedef deque<i32> di32;

#define all(c) (c).begin(), (c).end()
#define REP(i, a, b) for (auto i = a; i < b; i++)
#define REPA(i, a, b, acc) for (auto i = a; i < b; i += acc)
#define PB push_back
#define PF push_front
#define TR(c, it) for (auto (it) = (c).begin(); (it) != (c).end(); (it)++)

i32 main() {
  ios::sync_with_stdio(false); // Makes IO faster, remove this line if C style scanf/printf needed.
  i32 t;
  cin >> t;

  REP(i, 1, t + 1) {
    i32 n;
    cin >> n;
    vector<vi32> m(n);
    REP(j, 0, n) m[j] = vi32(n);

    i32 trace = 0, r = 0, c = 0;

    REP(j, 0, n * n) {
      i32 row = j / n;
      i32 col = j % n;
      cin >> m[row][col];
      if (row == col) trace += m[row][col];
    }

    REP(j, 0, n) {
      unordered_set<i32> rSet;
      unordered_set<i32> cSet;
      REP(k, 0, n) {
        i32 v = m[j][k];
        if (rSet.count(v)) {
          r++;
          break;
        }
        rSet.insert(v);
      }

      REP(k, 0, n) {
        i32 v = m[k][j];
        if (cSet.count(v)) {
          c++;
          break;
        }
        cSet.insert(v);
      }
    }

    cout << "Case #" << i << ": " << trace << " " << r << " " << c << "\n";
  }
}
