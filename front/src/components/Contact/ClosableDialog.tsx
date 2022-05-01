import React, { useCallback, useEffect, useState } from "react";
import { isValidEmailFormat, isValidRequiredInput } from "../../function/common";
import { Dialog, DialogContent, TextField, MenuItem } from "@material-ui/core";
import { AttachFile, Close } from "@material-ui/icons";
import { PrimaryButton, SelectBox, Spacer, TextInput } from "../UIkit";
import { getUserEmail, getUserName } from "../../reducks/user/selectors";
import { getAuthentication } from "../../function/common";
import { useSelector } from "react-redux";
import cat from "../../assets/img/cat.png";
import axios from "axios";
import { RootState } from "../../types/entity/rootState";
import styled from "styled-components";

const TextArea = styled.div`
  float: left;
  width: 55%;
  padding: 10px 30px 10px 20px;
  box-sizing: border-box;
`;

const InputArea = styled.div`
  float: right;
  width: 45%;
`;

const Label = styled.label`
  display: flex;
  justify-content: center;
  width: 130px;
  padding: 8px;
  border-radius: 20px;
  background-color: #4dd0e1;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    opacity: 0.7;
  }
`;

const ImageLabel = styled.label`
  padding: 5px 8px 5px 5px;
  margin: 5px 0;
  font-size: 11px;
  display: inline-block;
  background-color: #dcdcdc;
  border-radius: 3px;
  justify-content: center;
`;

const StyledClose = styled(Close)`
  float: left;
  margin-right: 3px;
  color: #f5f5f5;
  font-size: 14px;
  cursor: pointer;
`;

const StyledInput = styled.input`
  display: none;
`;

type Props = {
  open: boolean;
  onClose: () => void;
};

const ClosableDialog = (props: Props) => {
  const selector = useSelector((state: RootState) => state);
  const userEmail = getUserEmail(selector);
  const userName = getUserName(selector);

  const [email, setEmail] = useState(""),
    [select, setSelect] = useState(""),
    [text, setText] = useState(""),
    [image, setImage] = useState<File | null>(null),
    [name, setName] = useState(""),
    [isSubmitted, setIsSubmitted] = useState(false);

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail],
  );

  const inputSelect = useCallback(
    (event) => {
      setSelect(event.target.value);
    },
    [setSelect],
  );

  const inputText = useCallback(
    (event) => {
      setText(event.target.value);
    },
    [setText],
  );

  const inputImage = useCallback(
    (event) => {
      setImage(event.target.files[0]);
      // enable to attach same file
      event.target.value = "";
    },
    [setImage],
  );

  const handleIsSubmittedToggle = useCallback(() => {
    setIsSubmitted(!isSubmitted);
  }, [setIsSubmitted, isSubmitted]);

  const handleSendMail = (email: string, select: string, text: string, image: File | null, name: string) => {
    const apiEndpoint = process.env.REACT_APP_API_URL + "inquiries/create";
    const headers = getAuthentication();

    if (!isValidEmailFormat(email)) {
      alert("メールアドレスの形式が不正です");
      return false;
    }

    if (!isValidRequiredInput(email, select, text)) {
      alert("未入力の項目があります");
      return false;
    }

    interface CostomFormData extends FormData {
      append(name: string, value: string | Blob | null, fileName?: string): void;
    }

    let form: CostomFormData = new FormData();
    form.append("email", email);
    form.append("select", select);
    form.append("text", text);
    form.append("name", name);
    if (image != null) form.append("image", image);

    axios
      .post(apiEndpoint, form, { headers: headers })
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
        onClose={() => {
          props.onClose();
          setTimeout(() => {
            setEmail("");
            setSelect("");
            setText("");
            setImage(null);
            setName("");
            setIsSubmitted(false);
          }, 200);
        }}
        fullWidth={true}
        maxWidth={"md"}
      >
        {isSubmitted ? (
          <DialogContent>
            <p>貴重なご意見をいただきありがとうございます。</p>
            <p>今後ともPeANをよろしくお願いいたします！</p>
            <img src={cat} alt="ねこ" width="180px" height="180px" />
          </DialogContent>
        ) : (
          <DialogContent>
            <TextArea>
              <p>PeANをご利用いただきありがとうございます。</p>
              <p>ご不明点やご意見等ございましたら、フォームよりご連絡ください。</p>
              <p>また、ヘルプページによくある質問を記載しておりますので、合わせてご確認いただけると幸いです。</p>

              <p>※ いただきましたご意見は、メールにて順次ご返信させていただきます。</p>
              <img src={cat} alt="ねこ" width="180px" height="180px" />
            </TextArea>
            <InputArea>
              <TextInput
                fullWidth={true}
                label={"メールアドレス"}
                multiline={false}
                required={true}
                rows={1}
                value={email}
                variant="outlined"
                onChange={inputEmail}
              />
              <Spacer size="xxs" />
              <SelectBox displayEmpty={true} value={select} variant="outlined" onChange={inputSelect} fullWidth={true}>
                <MenuItem value="">- 選択してください -</MenuItem>
                {menus.map((menu) => (
                  <MenuItem value={menu.value} key={menu.id}>
                    {menu.label}
                  </MenuItem>
                ))}
              </SelectBox>
              <Spacer size="xxs" />
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
              <Spacer size="xxs" />
              <Label>
                <AttachFile style={{ fontSize: "16px" }} />
                画像を添付する
                <StyledInput type="file" accept="image/jpeg, image/png" onChange={(e) => inputImage(e)} />
              </Label>
              {image && (
                <ImageLabel>
                  <StyledClose onClick={() => setImage(null)} />
                  {image.name}
                </ImageLabel>
              )}
              <Spacer size="xxs" />
              <PrimaryButton
                id={"button"}
                label={"送信"}
                fullWidth={true}
                disabled={!email || !select || !text}
                onClick={() => handleSendMail(email, select, text, image, name)}
              />
            </InputArea>
          </DialogContent>
        )}
        <Spacer size="xxs" />
      </Dialog>
    </div>
  );
};

export default ClosableDialog;
