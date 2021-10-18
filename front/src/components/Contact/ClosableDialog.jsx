import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { isValidEmailFormat, isValidRequiredInput } from "../../function/common";
import { Dialog, DialogContent, TextField, MenuItem } from "@material-ui/core";
import { AttachFile, Close } from "@material-ui/icons";
import { PrimaryButton, SelectBox, TextInput } from "../../components/UIkit";
import { getUserEmail, getUserName } from "../../reducks/users/selectors";
import { useSelector } from "react-redux";
import axios from "axios";

const useStyles = makeStyles(() => ({
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
    "&:hover": {
      opacity: 0.7,
    },
  },
  input: {
    display: "none",
  },
  image: {
    padding: "5px 8px 5px 5px",
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
  const userName = getUserName(selector);

  const [email, setEmail] = useState(""),
    [select, setSelect] = useState(""),
    [text, setText] = useState(""),
    [image, setImage] = useState(""),
    [name, setName] = useState(""),
    [isSubmitted, setIsSubmitted] = useState(false);

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, [setEmail]);

  const inputSelect = useCallback((event) => {
    setSelect(event.target.value);
  }, [setSelect]);

  const inputText = useCallback((event) => {
    setText(event.target.value);
  }, [setText]);

  const inputImage = useCallback((event) => {
    setImage(event.target.files[0]);
    // enable to attach same file
    event.target.value = "";
  }, [setImage]);

  const handleIsSubmittedToggle = useCallback(() => {
    setIsSubmitted(!isSubmitted);
  },
  [setIsSubmitted, isSubmitted]
  );

  const handleSendMail = (email, select, text, image, name) => {
    const apiEndpoint = "http://localhost:4000/api/v1/inquiries/create";

    if (!isValidEmailFormat(email)) {
      alert("メールアドレスの形式が不正です");
      return false;
    }

    if (!isValidRequiredInput(email, select, text)) {
      alert("未入力の項目があります");
      return false;
    }

    let form = new FormData();
    form.append("email", email);
    form.append("select", select);
    form.append("text", text);
    form.append("image", image);
    form.append("name", name);

    axios
      .post(apiEndpoint, form)
      .then(() => {
        handleIsSubmittedToggle();
      })
      .catch(() => {
        alert("メール送信に失敗しました。時間を置いて再度お試しください");
      });
  };

  useEffect(() => {
    setName(userName);
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
        {isSubmitted ? (
          <DialogContent>
            <p>貴重なご意見をいただきありがとうございます。</p>
            <p>今後ともnurse-stepをよろしくお願いいたします！</p>
            <img src="cat.png" alt="ねこ" width="180px" height="180px" />
          </DialogContent>
        ) : (
          <DialogContent>
            <div className={classes.textArea}>
              <p>nurse-stepをご利用いただきありがとうございます。</p>
              <p>ご不明点やご意見等ございましたら、フォームよりご連絡ください。</p>
              <p>また、ヘルプページによくある質問を記載しておりますので、合わせてご確認いただけると幸いです。</p>

              <p>※ いただきましたご意見は、メールにて順次ご返信させていただきます。</p>
              <img src="cat.png" alt="ねこ" width="180px" height="180px" />
            </div>
            <div className={classes.inputArea}>
              <TextInput
                fullWidth={true}
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
                label="メッセージ"
                multiline={true}
                required={true}
                rows={6}
                value={text}
                variant="outlined"
                onChange={inputText}
              />
              <div className="module-spacer--extra-extra-small" />
              <label className={classes.label}>
                <AttachFile style={{ fontSize: "16px" }} />
                画像を添付する
                <input type="file" className={classes.input} accept="image/jpeg, image/png" onChange={(e) => inputImage(e)} />
              </label>
              {image && (
                <label className={classes.image}>
                  <Close className={classes.close} onClick={() => setImage("")} />
                  {image.name}
                </label>
              )}
              <div className="module-spacer--extra-extra-small" />
              <PrimaryButton
                id={"button"}
                label={"送信"}
                fullWidth={true}
                disabled={!email || !select || !text}
                onClick={() => handleSendMail(email, select, text, image, name)}
              />
            </div>
          </DialogContent>
        )}
        <div className="module-spacer--extra-extra-small" />
      </Dialog>
    </div>
  );
};

export default ClosableDialog;
