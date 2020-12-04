const findDifference = function (e) {
  //Get the left and right input texts
  leftText = document.getElementById('leftInput').value;
  rightText = document.getElementById('rightInput').value;

  //find LCS/Common Text
  let commonText = LCS(leftText, rightText);

  //find common/uncommon text and highlight them
  let leftDifferenceDiv = document.getElementById('leftOutput');
  leftDifferenceDiv.innerHTML = highlightText(commonText, leftText);
  leftDifferenceDiv.style.visibility = 'visible';
  leftDifferenceDiv.style.backgroundColor = '#393939';

  let rightDifferenceDiv = document.getElementById('rightOutput');
  rightDifferenceDiv.innerHTML = highlightText(commonText, rightText);
  rightDifferenceDiv.style.visibility = 'visible';
  rightDifferenceDiv.style.backgroundColor = '#393939';

  //equalize size of both output divs if on @media (width>1000)
  let maxOffsetHeight = Math.max(
    leftDifferenceDiv.offsetHeight,
    rightDifferenceDiv.offsetHeight
  );

  let vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  if (vw >= 1000) {
    leftDifferenceDiv.style.height = String(maxOffsetHeight) + 'px';
    rightDifferenceDiv.style.height = String(maxOffsetHeight) + 'px';
  }
};

const LCS = function (text1, text2) {
  rows = text1.length;
  cols = text2.length;

  //create a matrix of size (rows+1, cols+1) and fill it with 0s
  let matrix = new Array(rows + 1)
    .fill(0)
    .map(() => new Array(cols + 1).fill(0));

  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      //if the characters are equal, value of LCS is 1 + LCS[i-1][j-1]
      if (text1[i - 1] == text2[j - 1]) {
        matrix[i][j] = 1 + matrix[i - 1][j - 1];
      }
      //else if the characters are un-equal, value of LCS is max of prev row-same col OR prev col-same row
      else {
        matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);
      }
    }
  }
  let i = rows;
  let j = cols;
  let reverseCommonText = '';
  while (i > 0 && j > 0) {
    // if characters are equal, append to output and backtrack to diagonal element (i-1, j-1)
    if (text1[i - 1] == text2[j - 1]) {
      reverseCommonText = reverseCommonText + text1[i - 1];
      i = i - 1;
      j = j - 1;
    }
    // if characters are un-equal, backtrack to max element between (i-1, j) OR (i, j-1)
    else {
      if (matrix[i - 1][j] > matrix[i][j - 1]) i = i - 1;
      else j = j - 1;
    }
  }
  //return the reversed string since original order of characters is the opposite
  return reverseCommonText.split('').reverse().join('');
};

const highlightText = function (commonText, originalText) {
  let i = 0;
  let j = 0;
  let text = '';

  while (i < commonText.length && j < originalText.length) {
    if (commonText[i] == originalText[j]) {
      text =
        text + "<span class='green-highlight'>" + originalText[j] + '</span>';
      i++;
      j++;
    } else {
      text =
        text + "<span class='red-highlight'>" + originalText[j] + '</span>';
      j++;
    }
  }

  //additional unmatched text in the original text
  while (j < originalText.length) {
    text = text + "<span class='red-highlight'>" + originalText[j] + '</span>';
    j++;
  }
  return text;
};

const submit = document
  .getElementById('submitButton')
  .addEventListener('click', findDifference);
