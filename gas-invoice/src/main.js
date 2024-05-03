function onOpen(e) {
  const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  spreadSheet.addMenu(`追加機能`, [
    {
      name: `データ取得`,
      functionName: `menuItemGetData`,
    },
  ]);
}

const substringTagAfter = (html, searchTag) => {
  const index = html.indexOf(searchTag);
  // indexOfの結果が-1の場合はなにも返さない
  if (index === -1) {
    return ``;
  }
  // substringは文字列を返す
  // indexOfの返り値とserchTagの文字列の数をsubstringに渡す？
  return html.substring(index + searchTag.length);
};

const substringTagBefore = (html, searchTag) => {
  const index = html.indexOf(searchTag);
  if (index === -1) {
    return ``;
  }
  return html.substring(0, index);
};

const menuItemGetData = () => {
  const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheetData = spreadSheet.getSheetByName(`シート1`);

  const colInvoiceNumber = 1;

  const colURL = 2;
  const colCompanyName = 3;
  const colDate = 4;
  const colAddress = 5;

  const rowStartData = 2;
  const rowEndData = sheetData.getDataRange().getLastRow();

  for (let i = rowStartData; i <= rowEndData; i += 1) {
    const url =
      `https://www.invoice-kohyo.nta.go.jp/regno-search/detail?selRegNo=` +
      sheetData.getRange(i, colInvoiceNumber).getValue();
    // 2行目のB列にurlをセット
    sheetData.getRange(i, colURL).setValue(url);
    const response = UrlFetchApp.fetch(url);
    // console.log(response);
    const htmlPage = response.getContentText(`UTF-8`);
    {
      const searchTag = `<p class="itemdata sp_nmTsuushou_data">`;
      const indexPage = htmlPage.indexOf(searchTag);
      console.log(indexPage);
      // indexOfの結果が-1返されるということは該当なし、ここらへんに問題がある
      // searchTagに代入されているhtml要素が間違えていた
      // 正しく直すとindexOfは17882を返す
      if (indexPage !== -1) {
        const html = htmlPage.substring(indexPage + searchTag.length);
        const index = html.indexOf(`</p>`);
        if (index !== -1) {
          sheetData
            .getRange(i, colCompanyName)
            .setValue(html.substring(0, index));
        }
      }
    }

    {
      const html1 = substringTagAfter(
        htmlPage,
        `<h3 class="itemlabel">登録年月日</h3>`
      );
      if (html1 !== ``) {
        const html2 = substringTagAfter(html1, `<p class="itemdata">`);
        if (html2 !== ``) {
          const html3 = substringTagBefore(html2, `</p>`);
          if (html3 !== ``) {
            // console.log(html3);
            sheetData.getRange(i, colDate).setValue(html3);
          }
        }
      }
    }

    {
      const html1 = substringTagAfter(
        htmlPage,
        `<h3 class="hontenaddr_label itemlabel">本店又は主たる事務所の所在地</h3>`
      );
      if (html1 !== ``) {
        const html2 = substringTagAfter(html1, `<p class="itemdata">`);
        if (html2 !== ``) {
          const html3 = substringTagBefore(html2, `</p>`);
          if (html3 !== ``) {
            sheetData.getRange(i, colAddress).setValue(html3);
          }
        }
      }
    }
  }
};
