function findDifference(e) {
  //e.preventDefault();
  console.log(e);
  console.log('abc');

  leftText = document.getElementById('leftInput').value;
  rightText = document.getElementById('rightInput').value;
  //console.log(leftText);
  let commonText = findLCS(leftText, rightText);
  console.log(commonText);

  let leftDifferenceDiv = document.getElementById('leftOutput');
  leftDifferenceDiv.innerHTML = getHighlightedText(commonText, leftText);
  leftDifferenceDiv.style.visibility = 'visible';

  let rightDifferenceDiv = document.getElementById('rightOutput');
  rightDifferenceDiv.innerHTML = getHighlightedText(commonText, rightText);
  rightDifferenceDiv.style.visibility = 'visible';

  console.log(rightDifferenceDiv);
}

function findLCS(text1, text2) {
  rows = text1.length;
  cols = text2.length;
  let matrix = new Array(rows + 1)
    .fill(0)
    .map(() => new Array(cols + 1).fill(0));
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      if (text1[i - 1] == text2[j - 1])
        matrix[i][j] = Math.max(
          matrix[i - 1][j],
          matrix[i][j - 1],
          1 + matrix[i - 1][j - 1]
        );
      else matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);
    }
  }
  let i = rows;
  let j = cols;
  let commonText = '';
  while (i > 0 && j > 0) {
    if (text1[i - 1] == text2[j - 1]) {
      commonText = commonText + text1[i - 1];
      i = i - 1;
      j = j - 1;
    } else {
      if (matrix[i - 1][j] > matrix[i][j - 1]) i = i - 1;
      else j = j - 1;
    }
  }

  return commonText.split('').reverse().join('');
}

function getHighlightedText(commonText, compareText) {
  let i = 0;
  let j = 0;
  text = '';
  while (i < commonText.length && j < compareText.length) {
    if (commonText[i] == compareText[j]) {
      text =
        text + "<span class='green-highlight'>" + compareText[j] + '</span>';
      i++;
      j++;
    } else {
      text = text + "<span class='red-highlight'>" + compareText[j] + '</span>';
      j++;
    }
  }
  while (j < compareText.length) {
    text = text + "<span class='red-highlight'>" + compareText[j] + '</span>';
    j++;
  }
  return text;
}

const submit = document
  .getElementById('submitButton')
  .addEventListener('click', findDifference);
