function onOpen(e) {
  const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  spreadSheet.addMenu(`追加機能`, [
    {
      name: `メニュー1`,
      functionName: `testMenuItem1`,
    },
    {
      name: `メニュー2`,
      functionName: `testMenuItem2`,
    },
  ]);
}
const testMenuItem1 = () => {
  console.log(`testMenuItem1`);
  Browser.msgBox(`info`, `testMenuItem1`, Browser.Buttons.OK);
};

const testMenuItem2 = () => {
  console.log(`testMenuItem2`);
  Browser.msgBox(`info`, `testMenuItem2`, Browser.Buttons.OK);
};
