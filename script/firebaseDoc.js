/* 

- Firebase API Key를 공개하는 것이 안전합니까? https://haranglog.tistory.com/25
- 이메일 링크로 로그인 완료
    - 보안 문제
    의도하지 않은 사용자나 기기를 통해 로그인 링크가 사용되는 것을 방지하기 위해 
    Firebase 인증에서는 로그인 과정을 완료할 때 사용자의 이메일 주소를 입력해야 합니다. 
    로그인하려면 이 이메일 주소가 처음에 로그인 링크를 보낸 주소와 일치해야 합니다.

    링크를 요청한 기기에서 로그인 링크를 여는 사용자를 위해 이 과정을 간소화할 수 있습니다. 
    예를 들어 로그인 이메일을 보낼 때 localStorage 또는 쿠키를 사용하여 사용자의 이메일 주소를 로컬에 저장하면 됩니다. 
    그런 다음 이 이메일 주소를 사용하여 이 과정을 완료합니다. 
    세션 인젝션의 위험이 있으므로 사용자의 이메일을 리디렉션 URL 매개변수에서 전달해서는 안 되며 재사용해서도 안 됩니다.

    로그인이 완료되면 확인되지 않은 이전 로그인 메커니즘은 사용자에게서 모두 삭제되고 기존 세션은 무효화됩니다. 
    예를 들어 누군가가 이전에 같은 이메일과 비밀번호로 확인되지 않은 계정을 만든 경우 이 사용자의 비밀번호는 삭제됩니다. 
    이는 명의를 도용해 소유권을 주장하고 확인되지 않은 계정을 만들었던 사람이 
    이 이메일과 비밀번호로 다시 로그인하는 것을 방지하기 위해서입니다.

    또한 중개 서버에서 링크를 가로채지 않도록 프로덕션 단계에서 HTTPS URL을 사용해야 합니다.

    참고문서: https://judahhh.tistory.com/75#%E-%-C%--%--%EC%BF%A-%ED%--%A-%EC%--%--%--%EB%-C%--%ED%--%B-%--%EC%--%A-%EB%AA%--%ED%--%B-%EC%A-%BC%EC%--%B-%EC%-A%---%---%EC%BF%A-%ED%--%A-%EB%A-%BC%--%ED%--%B-%ED%--%B-%--HTTP%--%EC%--%--%ED%--%-C%EC%-C%A-%EC%A-%--%EB%A-%BC%--%EC%--%B-%EB%--%BB%EA%B-%-C%--%ED%--%--%EB%-A%--%EC%A-%--%--%ED%--%B-%EB%-D%BC%EC%-D%B-%EC%--%B-%ED%-A%B--%EC%--%-C%EB%B-%--%--%EA%B-%--%EC%A-%--%EC%--%--%EC%--%-C%--%EC%--%A-%EB%AA%---%--%EC%-E%A-%EB%-B%A-%EC%A-%--%--%EC%--%A-%EB%AA%---

- 웹 페이지에서 로그인 완료 : https://firebase.google.com/docs/auth/web/email-link-auth?hl=ko#completing_sign-in_in_a_web_page
    이메일 링크 딥 링크의 형식은 대역 외 이메일 작업에 사용된 형식과 같습니다. 
    이러한 작업에는 이메일 확인, 비밀번호 재설정 및 이메일 변경 취소 등이 있습니다. 
    Firebase 인증에서는 이메일 링크를 사용한 로그인 링크인지 간편하게 확인할 수 있도록 
    isSignInWithEmailLink API를 제공합니다.

    방문 페이지에서 로그인을 완료하려면 
    사용자의 이메일과 일회용 코드가 포함된 실제 이메일 링크를 사용하여 
    signInWithEmailLink를 호출합니다.


import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

// 링크가 이메일 링크로 로그인되어 있는지 확인합니다.
const auth = getAuth();
if (isSignInWithEmailLink(auth, window.location.href)) {
    // 추가 상태 매개변수는 URL을 통해 전달할 수도 있습니다.
    // 트리거하기 전에 사용자가 의도한 작업을 계속하는 데 사용할 수 있습니다
    // 서명 작업.
    // 사용 가능한 경우 이메일을 가져옵니다. 사용자가 완료한 경우 사용 가능해야 합니다
    // 그들이 그것을 시작한 곳과 같은 장치의 흐름입니다.
  let email = window.localStorage.getItem('emailForSignIn');
  if (!email) {
    // 사용자가 다른 장치에서 링크를 열었습니다. 세션 고정을 방지하기 위해
    // 공격, 사용자에게 관련 이메일을 다시 제공하도록 요청합니다. 예를 들어, 다음과 같습니다:
    email = window.prompt('Please provide your email for confirmation');
  }
  // 클라이언트 SDK가 링크에서 코드를 구문 분석합니다.
  signInWithEmailLink(auth, email, window.location.href)
    .then((result) => {
      // 저장소에서 이메일을 지웁니다.
      window.localStorage.removeItem('emailForSignIn');
        // result.user를 통해 새 사용자에 액세스할 수 있습니다
        // 다음을 통해 추가 사용자 정보 프로필을 사용할 수 없습니다:
        // result.additionalUserInfo.profile == null
        // 사용자가 새 것인지 기존 것인지 확인할 수 있습니다:
        // result.additionalUserInfo.isNewUser
    })
    .catch((error) => {
        // 오류가 발생했습니다. 코드를 검사할 수 있습니다. error.code
        // 일반적인 오류는 잘못된 전자 메일과 유효하지 않거나 만료된 OTP일 수 있습니다.
    });
}

*/