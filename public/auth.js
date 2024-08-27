const guestLoginDialog = document.getElementById("guestLoginDialog");
const managerLoginDialog = document.getElementById("managerLoginDialog"); // Correct dialog reference
const signupSelectionDialog = document.getElementById("signupSelectionDialog");
const guestSignupDialog = document.getElementById("guestSignupDialog");
const managerSignupDialog = document.getElementById("managerSignupDialog");
const welcomeMessage = document.getElementById("welcomeMessage");
const addcafeBtn = document.getElementById("add-cafe-button"); //카페추가버튼
const deletecafeBtn = document.getElementById("delete-cafe-button"); // 카페삭제버튼
const deleteAllFavoritesButton = document.getElementById('deleteAllFavoritesButton');

const openGuestLoginDialogButton = document.getElementById(
  "openGuestLoginDialog"
);
const openManagerLoginDialogButton = document.getElementById(
  "openManagerLoginDialog"
);
const LogoutButton = document.getElementById(
  "Logout"
);

const guestLoginForm = document.getElementById("guest-login-form");
const guestUsername = document.getElementById("guest-username");
const guestPassword = document.getElementById("guest-password");


const managerLoginForm = document.getElementById("manager-login-form"); // ID 변경
const managerUsername = document.getElementById("manager-username"); // ID 변경
const managerPassword = document.getElementById("manager-password"); // ID 변경


const guestSignupForm = document.getElementById("guest-signup-form");
const managerSignupForm = document.getElementById("manager-signup-form");



openGuestLoginDialogButton.addEventListener("click", () => {
  guestLoginDialog.showModal();
});
openManagerLoginDialogButton.addEventListener("click", () => {
  managerLoginDialog.showModal();
});

let isGuestLoggedIn = false; // 로그인 상태 변수 추가

guestLoginForm.addEventListener("submit", (event) => {
  event.preventDefault(); // 기본 폼 제출 동작을 막습니다.
  guestLoginDialog.returnValue = "submit"; // 명시적으로 returnValue를 설정합니다.
  guestLoginDialog.close(); // 다이얼로그를 닫습니다.
  const username = guestUsername.value;
  const password = guestPassword.value;

  const guests = JSON.parse(localStorage.getItem('guests')) || [];
  const guest = guests.find(guest => guest.username === username);

  if (!guest) {
    alert("아이디를 확인해주세요.");
  } else if (guest.password !== password) {
    alert("비밀번호를 확인해주세요.");
    console.log('Entered password:', password);
    console.log('Stored password:', guest.password);
  } else {
    alert("로그인 성공!");
    guestLoginDialog.close();
    const token = btoa(`${username}:${password}:true`);
    sessionStorage.setItem('guestToken', token); // 세션 스토리지에 토큰 저장
    handleGuestLoginSuccess(username);
  }
});

// 로그인 성공 시 처리 함수
function handleGuestLoginSuccess(username) {
  openGuestLoginDialogButton.style.display = "none";
  openManagerLoginDialogButton.style.display = "none";
  welcomeMessage.textContent = `${username}님 환영합니다.`;
  welcomeMessage.style.display = "block";
  LogoutButton.style.display = "block";
  showFavoritesButton.style.display = "inline-block";  // 즐겨찾기 버튼 생성
  deleteAllFavoritesButton.style.display ="inline-block"
  localStorage.setItem('userId', username); // 이름 저장
  isGuestLoggedIn = true; // 로그인 상태 업데이트
  console.log("isGuestLoggedIn:", isGuestLoggedIn);
}

// 페이지 로드 시 로그인 상태 확인
window.addEventListener("load", function () {
  const token = sessionStorage.getItem('guestToken');
  if (token) {
    const [username, password, loggedIn] = atob(token).split(':');
    if (loggedIn === "true") {
      handleGuestLoginSuccess(username);
    }
  }
});

// 로그아웃 버튼 클릭 시 이벤트 핸들러
LogoutButton.addEventListener("click", () => {
  sessionStorage.removeItem('guestToken'); // 세션 스토리지에서 토큰 삭제
  isGuestLoggedIn = false; // 로그인 상태 업데이트
  console.log("isGuestLoggedIn:", isGuestLoggedIn);
  // UI 요소 초기화
  openGuestLoginDialogButton.style.display = "block";
  openManagerLoginDialogButton.style.display = "block";
  deleteAllFavoritesButton.style.display ="none"

  welcomeMessage.style.display = "none";
  LogoutButton.style.display = "none";
  showFavoritesButton.style.display = "none"; // 즐겨찾기 버튼 숨기기
});


managerLoginForm.addEventListener("submit", (event) => {
  event.preventDefault(); // 기본 폼 제출 동작을 막습니다.
  managerLoginDialog.returnValue = "submit"; // 명시적으로 returnValue를 설정합니다.
  managerLoginDialog.close(); // 다이얼로그를 닫습니다.
  const username = managerUsername.value;
  const password = managerPassword.value;

  const managers = JSON.parse(localStorage.getItem('managers')) || [];
  const manager = managers.find(manager => manager.username === username);

  if (!manager) {
    alert("아이디를 확인해주세요.");
  } else if (manager.password !== password) {
    alert("비밀번호를 확인해주세요.");
  } else {
    alert("로그인 성공!");
    managerLoginDialog.close();
    const token = btoa(`${username}:${password}:true`); // 토큰 생성
    sessionStorage.setItem('managerToken', token); // 세션 스토리지에 토큰 저장
    handleManagerLoginSuccess(username); // 로그인 성공 처리 함수 호출
  }
});

// 로그인 성공 시 처리 함수
function handleManagerLoginSuccess(username) {
  openGuestLoginDialogButton.style.display = "none"; // 게스트 로그인 버튼 숨기기
  openManagerLoginDialogButton.style.display = "none"; // 관리자 로그인 버튼 숨기기
  welcomeMessage.textContent = `${username}님 환영합니다.`; // 환영 메시지 설정
  welcomeMessage.style.display = "block"; // 환영 메시지 표시
  LogoutButton.style.display = "block"; // 로그아웃 버튼 표시
  addcafeBtn.style.display = "inline-block"; // 카페 추가 버튼 표시
  deletecafeBtn.style.display = "inline-block"; // 카페 삭제 버튼 표시
  document.querySelector(".header-content").appendChild(welcomeMessage); // 환영 메시지 DOM에 추가
}

// 페이지 로드 시 로그인 상태 확인
window.addEventListener("load", function () {
  const token = sessionStorage.getItem('managerToken');
  if (token) {
    const [username, password, loggedIn] = atob(token).split(':');
    if (loggedIn === "true") {
      handleManagerLoginSuccess(username);
    }
  }
});

// 로그아웃 버튼 클릭 시 이벤트 핸들러
LogoutButton.addEventListener("click", () => {
  sessionStorage.removeItem('managerToken'); // 세션 스토리지에서 토큰 삭제
  // UI 요소 초기화
  openGuestLoginDialogButton.style.display = "block";
  openManagerLoginDialogButton.style.display = "block";
  welcomeMessage.style.display = "none";
  LogoutButton.style.display = "none";
  addcafeBtn.style.display = "none";
  deletecafeBtn.style.display = "none";
});
guestLoginDialog.addEventListener("close", () => {
  // 다이얼로그가 닫힐 때 입력 필드를 초기화합니다.
  guestUsername.value = "";
  guestPassword.value = "";
});
managerLoginDialog.addEventListener("close", () => {
  // 다이얼로그가 닫힐 때 입력 필드를 초기화합니다.
  managerUsername.value = "";
  managerPassword.value = "";
});

function closeGuestLoginDialog() {
  guestLoginDialog.returnValue = ""; // returnValue를 초기화합니다.
  guestLoginDialog.close();
}

function closeManagerLoginDialog() {
  managerLoginDialog.returnValue = ""; // returnValue를 초기화합니다.
  managerLoginDialog.close();
}
function opensignupSelectionDialog() {
  signupSelectionDialog.showModal();
}

function closeSignupSelectionDialog() {
  signupSelectionDialog.returnValue = "";
  signupSelectionDialog.close();
}

function openGuestSignupDialog() {
  signupSelectionDialog.close();
  guestSignupDialog.showModal();
}

function closeGuestSignupDialog() {
  guestSignupDialog.returnValue = "";
  guestSignupDialog.close();
}

function openManagerSignupDialog() {
  signupSelectionDialog.close();
  managerSignupDialog.showModal();
}

function closeManagerSignupDialog() {
  managerSignupDialog.returnValue = "";
  managerSignupDialog.close();
}

guestSignupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("guest-signup-username").value;
  const password = document.getElementById("guest-signup-password").value;
  const emailPrefix = document.getElementById("guest-signup-email-prefix").value;
  const emailDomain = document.getElementById("guest-signup-email-domain").value;
  const emailCustom = document.getElementById("guest-signup-email-custom").value;

  let email = emailPrefix + "@" + (emailDomain === "custom" ? emailCustom : emailDomain);

  const guestData = { username, password, email };

  let guests = JSON.parse(localStorage.getItem('guests')) || [];
  guests.push(guestData);
  localStorage.setItem('guests', JSON.stringify(guests)); //데이터에 저장

  alert("회원가입이 완료되었습니다.");
  closeGuestSignupDialog();
});

managerSignupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("manager-signup-username").value;
  const password = document.getElementById("manager-signup-password").value;
  const emailPrefix = document.getElementById("manager-signup-email-prefix").value;
  const emailDomain = document.getElementById("manager-signup-email-domain").value;
  const emailCustom = document.getElementById("manager-signup-email-custom").value;
  const phone = document.getElementById("manager-signup-phone").value;

  let email = emailPrefix + "@" + (emailDomain === "custom" ? emailCustom : emailDomain);

  const managerData = { username, password, email, phone };

  console.log("Manager Data:", managerData);

  let managers = JSON.parse(localStorage.getItem('managers')) || [];
  managers.push(managerData);
  localStorage.setItem('managers', JSON.stringify(managers)); //데이터에 저장

  alert("회원가입이 완료되었습니다.");
  closeManagerSignupDialog();
});

guestSignupDialog.addEventListener("close", () => {
  const guestUsername = document.getElementById("guest-signup-username");
  const guestPassword = document.getElementById("guest-signup-password");
  const guestEmailPrefix = document.getElementById("guest-signup-email-prefix");
  const guestEmailCustom = document.getElementById("guest-signup-email-custom");

  guestUsername.value = "";
  guestPassword.value = "";
  guestEmailPrefix.value = "";
  guestEmailCustom.value = "";
});
//입력초기화
managerSignupDialog.addEventListener("close", () => {
  const managerUsername = document.getElementById("manager-signup-username");
  const managerPassword = document.getElementById("manager-signup-password");
  const managerEmailPrefix = document.getElementById("manager-signup-email-prefix");
  const managerEmailCustom = document.getElementById("manager-signup-email-custom");
  const managerPhone = document.getElementById("manager-signup-phone");

  managerUsername.value = "";
  managerPassword.value = "";
  managerEmailPrefix.value = "";
  managerEmailCustom.value = "";
  managerPhone.value = "";
});

//입력초기화

document.getElementById("guest-signup-email-domain").addEventListener("change", function () {
  const customEmailInput = document.getElementById("guest-signup-email-custom");
  customEmailInput.style.display = this.value === "custom" ? "inline-block" : "none";
});

document.getElementById("manager-signup-email-domain").addEventListener("change", function () {
  const customEmailInput = document.getElementById("manager-signup-email-custom");
  customEmailInput.style.display = this.value === "custom" ? "inline-block" : "none";
});



// 즐겨찾기 관련
function getUserId() {
  return localStorage.getItem('userId');
}

function toggleFavorite(cafeId) {
  if (!isGuestLoggedIn) {
      alert('로그인이 필요합니다.');
      return;
  }

  const userId = getUserId();

  console.log('Sending userId:', userId);
  console.log('Sending cafeId:', cafeId);

  fetch(`http://localhost:3000/api/favorites`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, cafeId })
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
    if (data.success) {
      const favoriteButton = document.getElementById(`favorite-btn-${cafeId}`);
      if (data.action === 'added') {
        alert('즐겨찾기에 추가되었습니다.');
      } else if (data.action === 'removed') {
        alert('즐겨찾기에서 삭제되었습니다.');
        location.reload() // 로그인 유지되면 이거 해놓기
      }
    } else {
        alert('즐겨찾기 처리에 실패했습니다.');
    }
  })
  .catch(error => {
      console.error('Error:', error);
      alert('즐겨찾기 추가 중 오류가 발생했습니다.');
  });
}

function loadFavorites() {
  const userId = getUserId();

  if (!userId) {
    alert('로그인이 필요합니다.');
    return;
  }

  fetch(`http://localhost:3000/api/favorites/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      filterFavorites(data);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('즐겨찾기 목록을 불러오는 중 오류가 발생했습니다.');
    });
}
