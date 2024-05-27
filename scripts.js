let deletedSubmissions = [];

document.addEventListener('DOMContentLoaded', () => {
    const submissions = JSON.parse(localStorage.getItem('submissions')) || [];
    const dataContainer = document.getElementById('submitted-data');

    if (submissions.length > 0) {
        submissions.forEach((submission, index) => {
            const submissionHTML = `
                <div class="submission">
                    <h2>신청서 #${index + 1}</h2>
                    <p><strong>이름:</strong> ${submission.name}</p>
                    <p><strong>성별/나이:</strong> ${submission.genderAge}</p>
                    <p><strong>학교(전공):</strong> ${submission.school}</p>
                    <p><strong>거주지(가장 가까운 역):</strong> ${submission.residence}</p>
                    <p><strong>사용하실 핸드폰 기종(카메라 가능):</strong> ${submission.phoneModel}</p>
                    <p><strong>자기소개(MBTI 포함 간단한 소개):</strong> ${submission.introduction}</p>
                    <p><strong>연락처:</strong> ${submission.contact}</p>
                </div>`;
            dataContainer.innerHTML += submissionHTML;
        });
    } else {
        dataContainer.innerHTML = "<p>아직 제출된 정보가 없습니다.</p>";
    }
});

function checkPassword() {
    const password = document.getElementById('password').value;
    if (password === "jaewon123") {
        document.getElementById('password-section').style.display = 'none';
        document.getElementById('admin-section').style.display = 'block';
    } else {
        alert("비밀번호가 틀렸습니다.");
    }
}

function deleteLatestSubmission() {
    if (confirm("가장 최근의 사용자 정보를 삭제하시겠습니까?")) {
        let submissions = JSON.parse(localStorage.getItem('submissions')) || [];
        if (submissions.length > 0) {
            deletedSubmissions.push(submissions.pop()); // 가장 최근의 정보 삭제 및 백업
            localStorage.setItem('submissions', JSON.stringify(submissions));
            updateSubmissionsView(submissions);
        } else {
            alert("삭제할 정보가 없습니다.");
        }
    }
}

function restoreLatestSubmission() {
    if (deletedSubmissions.length > 0) {
        let submissions = JSON.parse(localStorage.getItem('submissions')) || [];
        submissions.push(deletedSubmissions.pop()); // 최근 삭제된 정보 복구
        localStorage.setItem('submissions', JSON.stringify(submissions));
        updateSubmissionsView(submissions);
    } else {
        alert("복구할 정보가 없습니다.");
    }
}

function updateSubmissionsView(submissions) {
    const dataContainer = document.getElementById('submitted-data');
    dataContainer.innerHTML = ''; // clear previous data
    if (submissions.length > 0) {
        submissions.forEach((submission, index) => {
            const submissionHTML = `
                <div class="submission">
                    <h2>신청서 #${index + 1}</h2>
                    <p><strong>이름:</strong> ${submission.name}</p>
                    <p><strong>성별/나이:</strong> ${submission.genderAge}</p>
                    <p><strong>학교(전공):</strong> ${submission.school}</p>
                    <p><strong>거주지(가장 가까운 역):</strong> ${submission.residence}</p>
                    <p><strong>사용하실 핸드폰 기종(카메라 가능):</strong> ${submission.phoneModel}</p>
                    <p><strong>자기소개(MBTI 포함 간단한 소개):</strong> ${submission.introduction}</p>
                    <p><strong>연락처:</strong> ${submission.contact}</p>
                </div>`;
            dataContainer.innerHTML += submissionHTML;
        });
    } else {
        dataContainer.innerHTML = "<p>아직 제출된 정보가 없습니다.</p>";
    }
}

function checkClubName() {
    const clubName = document.getElementById('club-name').value.toLowerCase();
    if (["셔터", "shutter"].includes(clubName)) {
        document.getElementById('initial-step').classList.remove('active');
        document.getElementById('form-step').classList.add('active');
    } else {
        alert("정확한 이름이 아닙니다.");
    }
}

function submitForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const genderAge = document.getElementById('gender-age').value;
    const school = document.getElementById('school').value;
    const residence = document.getElementById('residence').value;
    const phoneModel = document.getElementById('phone-model').value;
    const introduction = document.getElementById('introduction').value;
    const contact = document.getElementById('contact').value;

    const submission = {
        name,
        genderAge,
        school,
        residence,
        phoneModel,
        introduction,
        contact
    };

    let submissions = JSON.parse(localStorage.getItem('submissions')) || [];
    submissions.push(submission);
    localStorage.setItem('submissions', JSON.stringify(submissions));

    document.getElementById('form-step').classList.remove('active');
    document.getElementById('thanks-step').classList.add('active');
}

function submitUnavailableTime() {
    document.getElementById('thanks-step').classList.remove('active');
    document.getElementById('confirmation-step').classList.add('active');
}

function finishSubmission() {
    alert("제출이 완료되었습니다.");
    window.close(); // 프로그램을 닫습니다.
}
