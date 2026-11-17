
function calculateResult() {

    const name = document.getElementById("studentName").value.trim();
    const roll = document.getElementById("rollNumber").value.trim();
    const error = document.getElementById("errorMessage");

    const marks = [];
    
    error.textContent = "";

    // Validate student name
    const namePattern = /^[A-Za-z ]+$/;
    const alphabetCount = (name.match(/[A-Za-z]/g) || []).length;

    if (!namePattern.test(name) || alphabetCount < 5) {
        error.textContent =
            "Invalid Name! Enter at least 5 alphabets. Numbers are not allowed.";
        document.getElementById("marksheet").classList.add("hidden");
        return;
    }

    // Validate roll number
    if (roll === "") {
        error.textContent = "Please enter Roll Number.";
        document.getElementById("marksheet").classList.add("hidden");
        return;
    }

    // Get six subject marks
    for (let i = 1; i <= 6; i++) {

        const value = document.getElementById("subject" + i).value;

        // Empty marks means absent
        if (value.trim() === "") {
            marks.push(null);
            continue;
        }

        const mark = Number(value);

        // Validate marks
        if (!Number.isFinite(mark) || mark < 0 || mark > 100) {
            error.textContent =
                "Invalid Marks! Marks must be between 0 and 100.";
            document.getElementById("marksheet").classList.add("hidden");
            return;
        }

        marks.push(mark);
    }

    // Calculate total
    let total = 0;
    let absentCount = 0;
    let failed = false;

    let tableContent = "";

    marks.forEach((mark, index) => {

        let subjectStatus;

        if (mark === null) {
            subjectStatus = "ABSENT";
            absentCount++;
        } else {
            total += mark;

            if (mark < 50) {
                subjectStatus = "FAIL";
                failed = true;
            } else {
                subjectStatus = "PASS";
            }
        }

        tableContent += `
            <tr>
                <td>Subject ${index + 1}</td>
                <td>100</td>
                <td>${mark === null ? "Absent" : mark}</td>
                <td>${subjectStatus}</td>
            </tr>
        `;
    });

    // Calculate percentage out of 600
    const percentage = (total / 600) * 100;

    // Calculate grade
    let grade;

    if (absentCount > 0) {
        grade = "N/A";
    } else if (failed) {
        grade = "F";
    } else if (percentage >= 90) {
        grade = "A";
    } else if (percentage >= 80) {
        grade = "B";
    } else if (percentage >= 70) {
        grade = "C";
    } else if (percentage >= 60) {
        grade = "D";
    } else {
        grade = "E";
    }

    // Final result
    let finalResult;

    if (absentCount > 0) {
        finalResult = "ABSENT";
    } else if (failed) {
        finalResult = "FAIL";
    } else {
        finalResult = "PASS";
    }

    // Display student details
    document.getElementById("studentDetails").innerHTML = `
        <strong>Student Name:</strong> ${name}<br>
        <strong>Roll Number:</strong> ${roll}<br>
        <strong>Maximum Marks:</strong> 600
    `;

    // Display subject marks
    document.getElementById("marksTable").innerHTML = tableContent;

    // Display summary
    document.getElementById("summary").innerHTML = `
        <strong>Total Marks:</strong> ${total} / 600<br>
        <strong>Percentage:</strong> ${percentage.toFixed(2)}%<br>
        <strong>Grade:</strong> ${grade}<br>
        <strong>Absent Subjects:</strong> ${absentCount}<br>
        <strong>Final Result:</strong> ${finalResult}
    `;

    // Show marksheet
    document.getElementById("marksheet").classList.remove("hidden");
}

// Download marksheet as PDF
function downloadMarksheet() {

    window.print();

}
