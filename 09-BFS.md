# BFS(Breadth First Search)

-   다차원 배열에서 각 칸을 방문할 때 너비를 우선으로 방문하는 알고리즘
-   보통 그래프 자료구조에서 모든 노드를 탐색하기 위한 알고리즘임. 하지만 그래프 자료구조를 선행하는 것은 배보다 배꼽이 더 크다.

## BFS 흐름

1. 시작하는 칸을 큐에 넣고 방문했다는 표시를 남김
2. 큐에서 원소를 꺼내어 그 칸에 상하좌우로 인접한 칸에 대해 3번을 진행
3. 해당 칸을 이전에 방문했다면 아무 것도 하지 않고, 처음으로 방문했다면 방문했다는 표시를 남기고 해당 칸을 큐에 삽입
4. 큐가 빌 때까지 2번을 반복

-   방문했음을 체크하기에 모든 칸이 큐에 1번씩만 들어감: 시간 복잡도는 칸이 N개일 때 O(N)

## BFS의 구현

```cpp
#include <bits/stdc++.h>
using namespace std;
#define X first
#define Y second // pair에서 first, second를 줄여서 쓰기 위해서 사용
int board[502][502] =
{{1,1,1,0,1,0,0,0,0,0},
 {1,0,0,0,1,0,0,0,0,0},
 {1,1,1,0,1,0,0,0,0,0},
 {1,1,0,0,1,0,0,0,0,0},
 {0,1,0,0,0,0,0,0,0,0},
 {0,0,0,0,0,0,0,0,0,0},
 {0,0,0,0,0,0,0,0,0,0} }; // 1이 파란 칸, 0이 빨간 칸에 대응
bool vis[502][502]; // 해당 칸을 방문했는지 여부를 저장
int n = 7, m = 10; // n = 행의 수, m = 열의 수
int dx[4] = {1,0,-1,0};
int dy[4] = {0,1,0,-1}; // 상하좌우 네 방향을 의미
int main(void){
  ios::sync_with_stdio(0);
  cin.tie(0);
  queue<pair<int,int> > Q;
  vis[0][0] = 1; // (0, 0)을 방문했다고 명시
  Q.push({0,0}); // 큐에 시작점인 (0, 0)을 삽입.
  while(!Q.empty()){
    pair<int,int> cur = Q.front(); Q.pop();
    cout << '(' << cur.X << ", " << cur.Y << ") -> ";
    for(int dir = 0; dir < 4; dir++){ // 상하좌우 칸을 살펴볼 것이다.
      int nx = cur.X + dx[dir];
      int ny = cur.Y + dy[dir]; // nx, ny에 dir에서 정한 방향의 인접한 칸의 좌표가 들어감
      if(nx < 0 || nx >= n || ny < 0 || ny >= m) continue; // 범위 밖일 경우 넘어감
      if(vis[nx][ny] || board[nx][ny] != 1) continue; // 이미 방문한 칸이거나 파란 칸이 아닐 경우
      vis[nx][ny] = 1; // (nx, ny)를 방문했다고 명시
      Q.push({nx,ny});
    }
  }
}
```

c++의 경우 STL로 생성한 pair를 사용하면 된다. 하지만 Javascript는 이차원 배열을 사용해야 할 듯?

> 정석적인 BFS 코드가 다음과 같으니, 이 방식을 달달달 외우자

```js
// 2차원 배열로 보드 정의 (1이 파란 칸, 0이 빨간 칸)
const board = [
    [1, 1, 1, 0, 1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 1, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// 방문 여부를 저장하는 2차원 배열
const vis = Array(7)
    .fill()
    .map(() => Array(10).fill(false));

const n = 7; // 행의 수
const m = 10; // 열의 수

// 상하좌우 네 방향을 의미하는 배열
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

// BFS 구현
function bfs() {
    const queue = [];

    // 시작점 (0, 0)을 방문했다고 표시하고 큐에 추가
    vis[0][0] = true;
    queue.push([0, 0]);

    while (queue.length > 0) {
        const [curX, curY] = queue.shift(); // 큐에서 현재 위치 꺼내기
        console.log(`(${curX}, ${curY}) -> `);

        // 상하좌우 네 방향 탐색
        for (let dir = 0; dir < 4; dir++) {
            const nx = curX + dx[dir];
            const ny = curY + dy[dir];

            // 범위를 벗어나면 건너뛰기
            if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;

            // 이미 방문했거나 파란 칸이 아니면 건너뛰기
            if (vis[nx][ny] || board[nx][ny] !== 1) continue;

            // 방문 표시하고 큐에 추가
            vis[nx][ny] = true;
            queue.push([nx, ny]);
        }
    }
}

// BFS 실행
bfs();
```

## 구현 중 가장 많이 실수하는 것

-   x와 y의 혼동. 보통 BFS에서는 x는 행 y는 열이다.
-   시작점에 방문했다는 표시를 남기지 않음
-   방문했다는 표시를 큐에 '넣을 때' 해야하는데, 큐에서 '빼낼 때' 남기는 경우 -> 같은 칸이 큐에 여러 번 들어가게 되어 시간 초과 가능성
-   이웃한 원소가 범위를 벗어나는지 체크하는 것을 잊었거나 잘못 체크했다.

## BFS의 활용 및 응용

-   [1926 그림](https://www.acmicpc.net/problem/1926) : 시작점 찾기
-   [2178 미로 탐색](https://www.acmicpc.net/problem/2178) : 다차원 배열에서 최단경로
    -   큐에 쌓이는 칸은 무조건 거리 순이 된다!
-   [7576 토마토](https://www.acmicpc.net/problem/7576) : 여러 시작점에서 동시 시작 및 큐 시간초과 대응
-   [7569 토마토](https://www.acmicpc.net/problem/7569) : 3차원 배열 담기
-   [4179 불!](https://www.acmicpc.net/problem/4179)
    -   시작점의 종류가 여러 개일 때: 동시에 시작하지만 따로 한 번씩 BFS를 돌려야 하는 경우
-   [1697 숨바꼭질](https://www.acmicpc.net/problem/1697): 1차원 BFS와 순간이동.
    -   거리는 큐에 쌓이는 순서대로이니 먼저 선점한 큐가 그 지점까지 가장 빠른 경로!
-   [2583 영역 구하기](https://www.acmicpc.net/problem/2583): 1차원 BFS와 순간이동.
    -   너비는 pop되는 순간에!
-   [2206 벽 부수고 이동하기](https://www.acmicpc.net/problem/2206): 차원은 2차원이나 상태 관리를 위해 vis or dis를 3차원으로 관리해야 하는경우
    -   부수고 진행 중인지, 안 부수고 진행 중인지
-   [\*9466 텀 프로젝트](https://www.acmicpc.net/problem/9466): 방문 여부가 아니라 어떤 상태로 구분하고, 정해진 형식의 BFS가 아니어도 활용할 수 있는가
    -   기존 방식과 매우 다르고, DFS 풀이가 있으나 BFS로 고민해보면 상태를 구분하여 풀이가 가능하다.
-   [\*2573 빙산](https://www.acmicpc.net/problem/2573): 보드를 다루는 모든 로직이 BFS, DFS인 Flood Fill 알고리즘일 필요는 없다. 어떤 동작을 할 때 연결된 것들끼리 그룹지어 생각해야 하는 건지 구분해보자.
-   [\*2146 다리 만들기](https://www.acmicpc.net/problem/2146): 3차원 배열 상태관리 - 메모리 초과 / 대신 각 칸에 대해 BFS를 하나씩 진행하기
-   [\*13549 숨바꼭질 3](https://www.acmicpc.net/problem/13549): 큐에 쌓이는 순서가 거리 순을 보장하지 못할 때
-   [\*13913 숨바꼭질 4](https://www.acmicpc.net/problem/13913): 큐까지 찾아가는 경로를 따로 저장해야 할 때
-   [\*16920 확장 게임](https://www.acmicpc.net/problem/16920): 턴제 게임이며, 매 턴마다 BFS를 step만큼 실행할 때, nextQ를 생성 후 턴이 끝나면 q에서 교체
-   [\*11967 불 켜기](https://www.acmicpc.net/problem/11967): 현재 위치에서 할 수 있는 모든 일을 먼저 처리하고, 그 다음에 이동하는 것이 핵심
-   [\17071 숨바꼭질 5](https://www.acmicpc.net/problem/17071): 홀짝 최적화
