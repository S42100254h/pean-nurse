import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Dialog, DialogContent, TextField, MenuItem } from "@material-ui/core";
import { AttachFile, Close } from "@material-ui/icons";
import { PrimaryButton, SelectBox, TextInput } from "../../components/UIkit";
import { getUserEmail } from "../../reducks/users/selectors";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  container: {
    width: 1200,
  },
  textArea: {
    float: "left",
    width: "55%",
    padding: "10px 30px 10px 20px",
    boxSizing: "border-box",
  },
  inputArea: {
    float: "right",
    width: "45%",
  },
  label: {
    display: "flex",
    justifyContent: "center",
    width: "130px",
    padding: "8px",
    borderRadius: "20px",
    backgroundColor: "#4dd0e1",
    cursor: "pointer",
    fontSize: "12px",
  },
  input: {
    display: "none",
  },
  attachedFile: {
    padding: "5px",
    margin: "5px 0",
    fontSize: "11px",
    display: "inline-block",
    backgroundColor: "#dcdcdc",
    borderRadius: "3px",
    justifyContent: "center",
  },
  close: {
    float: "left",
    marginRight: "3px",
    color: "#f5f5f5",
    fontSize: "14px",
    cursor: "pointer",
  },
}));

const ClosableDialog = (props) => {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const userEmail = getUserEmail(selector);

  const [email, setEmail] = useState(""),
    [select, setSelect] = useState(""),
    [text, setText] = useState(""),
    [attached, setAttached] = useState("");

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, [setEmail]);

  const inputSelect = useCallback((event) => {
    setSelect(event.target.value);
  }, [setSelect]);

  const inputText = useCallback((event) => {
    setText(event.target.value);
  }, [setText]);

  const handleAttached = useCallback((event) => {
    setAttached(event.target.files[0].name);
    // enable to attach same file
    event.target.value = "";
  });
  
  useEffect(() => {
    setEmail(userEmail);
  }, [props.open]);

  const menus = [
    { label: "コース内容について", value: "course", id: "course" },
    { label: "お支払いについて", value: "payment", id: "payment" },
    { label: "エラー、トラブルについて", value: "error", id: "error" },
    { label: "その他", value: "others", id: "others" },
  ];

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={(e) => props.onClose(e)}
        ModalProps={{ keepMounted: true }}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogContent>
          <div className={classes.textArea}>
            <p>nurse-stepをご利用いただきありがとうございます。</p>
            <p>ご不明点やご意見等ございましたら、フォームよりご連絡ください。</p>
            <p>また、ヘルプページによくある質問を記載しておりますので、合わせてご確認いただけると幸いです。</p>

            <p>※ いただきましたご意見は、メールにて順次ご返信させていただきます。</p>
          </div>
          <div className={classes.inputArea}>
            <TextInput fullWidth={true}
              label={"メールアドレス"}
              multiline={false}
              required={true}
              row={1}
              value={email}
              variant="outlined"
              onChange={inputEmail}
            />
            <div className="module-spacer--extra-extra-small" />
            <SelectBox
              displayEmpty={true}
              value={select}
              variant="outlined"
              onChange={inputSelect}
            >
              <MenuItem value="">- 選択してください -</MenuItem>
              {menus.map((menu) => (
                <MenuItem value={menu.value} key={menu.id} >
                  {menu.label}
                </MenuItem>
              ))}
            </SelectBox>
            <div className="module-spacer--extra-extra-small" />
            <TextField
              fullWidth={true}
              multiline={true}
              rows={6}
              label="メッセージ"
              variant="outlined"
              onChange={inputText}
            />
            <div className="module-spacer--extra-extra-small" />
            <label className={classes.label}>
              <AttachFile style={{ fontSize: "16px" }} />
              画像を添付する
              <input type="file" className={classes.input} accept="image/jpeg, image/png" onChange={(e) => handleAttached(e)} />
            </label>
            { attached && (
              <label className={classes.attachedFile}>
                <Close className={classes.close} onClick={() => setAttached("")} />
                {attached}
              </label>
            ) }
            <div className="module-spacer--extra-extra-small" />
            <PrimaryButton
              id={"button"}
              label={"送信"}
              fullWidth={true}
            />
          </div>
        </DialogContent>
        <div className="module-spacer--extra-extra-small" />
      </Dialog>
    </div>
  );
};

export default ClosableDialog;
