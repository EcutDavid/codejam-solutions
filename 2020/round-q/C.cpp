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
#define PRINT(x) cout << #x ": " << (x) << endl;
#define TR(c, it) for (auto(it) = (c).begin(); (it) != (c).end(); (it)++)
#define MAX_PRECISION cout << setprecision(numeric_limits<double>::max_digits10);

i32 main() {
  ios::sync_with_stdio(false);  // Makes IO faster, remove this line if C style scanf/printf needed.

  i32 t;
  cin >> t;

  REP(i, 1, t + 1) {
     cout << "Case #" << i << ": ";
     i32 n;
     cin >> n;
     vector<vi32> tasks;
     REP(j, 0, n) {
       vi32 task(3);
       task[2] = j;
       cin >> task[0] >> task[1];
       tasks.push_back(task);
     }

     sort(tasks.begin(), tasks.end(), [](vi32 a, vi32 b) { return a[1] < b[1]; });
     map<i32, char> assignee;
     i32 c = 0, j = 0;
     bool failed = false;
     REP(k, 0, n) {
       i32 start = tasks[k][0];
       i32 index = tasks[k][2];

       if (start < c && start < j) {
         failed = true;
         break;
       }
       if (c >= j) {
        if (start >= c) {
          c = tasks[k][1];
          assignee[index] = 'C';
        } else {
          j = tasks[k][1];
          assignee[index] = 'J';
        }
       } else {
         if (start >= j) {
          j = tasks[k][1];
          assignee[index] = 'J';
        } else {
          c = tasks[k][1];
          assignee[index] = 'C';
        }
       }
     }

     if (failed) {
       cout << "IMPOSSIBLE\n";
     } else {
       for (auto entry : assignee) {
         cout << entry.second;
       }
       cout << "\n";
     }
  }
}
