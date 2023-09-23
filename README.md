# whagile
## 1. 프로젝트 소개 
**Agile 개발 방법론에 적응할 수 있게 도와주는 협업 툴**
### 1-1. 프로젝트 산출물

<img width="786" alt="산출물11" src="https://github.com/myrhymetree/whagile/assets/94158097/1b83fbad-4345-4bf6-917e-a8e1241314a1">

* 노션 링크 : [[https://www.notion.so/WHY-AGILE-a9a8bca9f63846e08c662bf71090765e?pvs=4]([https://ember-event-d5a.notion.site/WHY-AGILE-a9a8bca9f63846e08c662bf71090765e?pvs=4])]

## 2. 팀원 소개
<table>
  <tr>
    <td align="center">장민주<a href=""><b></b></td>
    <td align="center">이호성<a href=""><b></b></td>
    <td align="center">장한솔<a href=""><b></b></td>
    <td align="center">차우진<a href=""><b></b></td>
    <td align="center"><a href="https://github.com/myrhymetree"><b>박성준</b></td>
  </tr>

  <tr>
    <td align="center"><strong>백로그 관리 기능, 고객 관리 기능, PM, 일정관리</strong></td>
    <td align="center"><strong>회원 관리 기능, DB관리</strong></td>
    <td align="center"><strong>스프린트 관리 기능, 권한 관리 기능, 형상관리</strong></td>
    <td align="center"><strong>일감 관리, DB관리</strong></td>
    <td align="center"><strong>프로젝트 관리 기능, 형상관리</strong></td>
  </tr>
</table>

## 3. 개발 환경
![개발환경](https://github.com/myrhymetree/whagile/assets/94158097/2cfab0f9-ecb4-4aa3-9e2e-0d7d560d77bf)


## 4. ERD
![ERD](https://github.com/myrhymetree/whagile/assets/94158097/7cdd2689-0aea-4889-8247-d739be8e5ad4)


## 5. 기능소개
### 5-1. 프로젝트 관리
    - 대시보드, 프로젝트 목록을 확인할 수 있다.
    - 프로젝트 생성, 조회, 수정, 삭제
    - 프로젝트 참여 멤버 설정, 초대
    - 프로젝트 통계
### 5-2. 스프린트 관리
    - 스프린트 생성, 조회, 수정, 삭제
    - 스프린트 완료(회고 기능)
    - 스프린트 내의 일감 관리
### 5-3. 백로그 관리
    - 백로그 생성, 조회, 수정, 삭제 
### 5-4. 일감 관리
    - 일감 생성, 조회, 수정, 삭제 
### 5-5. 회원 관리
    - 로그인, 회원가입
    - 회원정보 수정, 삭제
### 5-6. 고객관리
    - 문의글 작성, 조회, 수정, 삭제
    - 문의 답변 작성, 조회, 수정, 삭제
### 5-7. 권한 관리 
    - 권한 생성, 조회, 수정, 삭제 

### 6. 프로토타입
https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FzF0Evdq0a6BR6pkcwSbBHi%2F%25ED%2594%2584%25EB%25A1%259C%25ED%2586%25A0%25ED%2583%2580%25EC%259D%25B4%25ED%2595%2591-v1%3Fnode-id%3D67%253A702%26scaling%3Dscale-down-width%26page-id%3D0%253A1%26starting-point-node-id%3D67%253A702%26show-proto-sidebar%3D1

### 7. 형상관리

* 형상관리 문서 : https://www.notion.so/da27da3bcce74bc4b66f447c73401291

#### 🏷️ Git Convention
| **Convention**  | **내용**                                                         |
|-----------------|----------------------------------------------------------------|
| **[FEAT]**        | 새로운 기능 추가                                                      |
| **[FIX]**         | 오류를 고친 경우                                                          |
| **[Test]**        |  테스트코드 관련 (테스트 추가, 테스트 리팩토링 등)     |
| **[STYLE]**     | 코드 포맷팅, 세미콜론 추가 및 제거, 주석 추가 및 제거,  미사용 변수 및 메소드 제거, 누락 등 코드 변경 없이 자잘한 수정을 하는 경우               |
| **[Rename]**      | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우                                   |
| **[REFACTOR]**      | 구조 변경 및 코드 리팩토링                                            |
| **[REMOVE]**      | 사용하지 않는 파일 또는 폴더를 삭제하는 경우                                            |
| **[HOTFIX]** | 치명적인 버그 를 고쳐야하는 경우                                                  |
| **[TEMPSAVE]** | 모든 팀원이 main branch pull을 받아야하는 경우                                         |
