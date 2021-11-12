import { deleteUserImageAction, editUserInfoAction, editUserImageAction, signUpAction, signInAction, signOutAction } from "./actions";
import { isValidEmailFormat, isValidRequiredInput, isValidPassword } from "../../function/common";
import { hideLoadingAction, showLoadingAction } from "../loading/actions";
import { setNotificationAction } from "../notification/actions";
import axios from "axios";
import { push } from "connected-react-router";

export const signUp = (name, email, password, password_confirmation) => {
  return async (dispatch) => {
    if(!isValidEmailFormat(email)) {
      alert("メールアドレスの形式が不正です");
      return false;
    } 

    if(!isValidRequiredInput(name, email, password)) {
      alert("ユーザー名かメールアドレス、パスワードが未入力です");
      return false;
    }

    if (password.length < 6) {
      alert("パスワードは６文字以上で入力してください");
      return false;
    }
    
    if (!isValidPassword(password, password_confirmation)) {
      alert("パスワードとパスワード（確認用）が一致しません");
      return false;
    }

    const apiEndpoint = process.env.REACT_APP_API_URL + "auth";
    const body = { name: name, email: email, password: password, password_confirmation: password_confirmation };

    axios
      .post(apiEndpoint, body)
      .then((resp) => {
        localStorage.setItem("access-token", resp.headers["access-token"]);
        localStorage.setItem("client", resp.headers["client"]);
        localStorage.setItem("uid", resp.headers["uid"]);

        dispatch(signUpAction(resp.data.data));
        dispatch(showLoadingAction("Sign up..."));
        dispatch(push("/dashboard"));

        setTimeout(() => {
          dispatch(hideLoadingAction());
          dispatch(setNotificationAction({ variant: "success", message: "ユーザー登録に成功しました。"}));
        }, 1000);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(setNotificationAction({ variant: "error", message: "ユーザー登録に失敗しました。" }));
        }, 400);
      });
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    if(!isValidEmailFormat(email)) {
      alert("メールアドレスの形式が不正です");
      return false;
    }

    if(!isValidRequiredInput(email, password)) {
      alert("メールアドレスかパスワードが未入力です");
      return false;
    }

    if(password.length < 6) {
      alert("パスワードは６文字以上で入力してください");
      return false;
    }

    const apiEndpoint = process.env.REACT_APP_API_URL + "auth/sign_in";
    const body = { email: email, password: password };

    axios
      .post(apiEndpoint, body)
      .then((resp) => {
        localStorage.setItem("access-token", resp.headers["access-token"]);
        localStorage.setItem("client", resp.headers["client"]);
        localStorage.setItem("uid", resp.headers["uid"]);
        
        dispatch(signInAction(resp.data.data));
        dispatch(showLoadingAction("Sign in..."));
        dispatch(push("/dashboard"));

        setTimeout(() => {
          dispatch(hideLoadingAction());
          dispatch(setNotificationAction({ variant: "success", message: "サインインしました。"}));
        }, 1000);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(setNotificationAction({ variant: "error", message: "サインインに失敗しました。入力内容をご確認ください。" }));
        }, 400);
      });
  };
};

export const signOut = () => {
  return async (dispatch) => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");
      const apiEndpoint = process.env.REACT_APP_API_URL + "auth/sign_out";

      axios
        .delete(apiEndpoint, {
          headers: {
            "access-token": auth_token,
            client: client,
            uid: uid,
          },
        })
        .then(() => {
          dispatch(signOutAction());
          dispatch(showLoadingAction("Sign out..."));
          localStorage.clear();
          dispatch(push("/"));
          
          setTimeout(() => {
            dispatch(hideLoadingAction());
            dispatch(setNotificationAction({ variant: "success", message: "サインアウトしました。" }));
          }, 1000);
        })
        .catch(() => {
          setTimeout(() => {
            dispatch(setNotificationAction({ variant: "error", message: "サインアウトに失敗しました。" }));
          }, 400);
        });
    } else {
      dispatch(push("/signin"));
    }
  }; 
};

export const deleteUser = () => {
  return async (dispatch) => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");
      const apiEndpoint = process.env.REACT_APP_API_URL + "auth";
      
      axios
        .delete(apiEndpoint, {
          headers: {
            "access-token": auth_token,
            client: client,
            uid: uid,
          },
        })
        .then(() => {
          dispatch(signOutAction());
          dispatch(showLoadingAction("Delete user..."));
          dispatch(push("/"));
          localStorage.clear();
          
          setTimeout(() => {
            dispatch(hideLoadingAction());
            dispatch(setNotificationAction({ variant: "success", message: "ユーザー情報を削除しました。" }));
          }, 1000);
        })
        .catch(() => {
          setTimeout(() => {
            dispatch(setNotificationAction({ variant: "error", message: "ユーザー情報の削除に失敗しました。" }));
          }, 400);
        });
    } else {
      dispatch(push("/signin"));
    }
  };
};

export const editUserInfo = (name, email) => {
  return async (dispatch) => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");
      const apiEndpoint = process.env.REACT_APP_API_URL + "auth";

      const body = { name: name, email: email };

      axios
        .patch(apiEndpoint, body, {
          headers: {
            "access-token": auth_token,
            client: client,
            uid: uid,
          },
        })
        .then((resp) => {
          localStorage.setItem("access-token", resp.headers["access-token"]);
          localStorage.setItem("client", resp.headers["client"]);
          localStorage.setItem("uid", resp.headers["uid"]);

          dispatch(editUserInfoAction(resp.data.data));
          dispatch(showLoadingAction("Update ..."));
          dispatch(push("/dashboard"));
          
          setTimeout(() => {
            dispatch(hideLoadingAction());
            dispatch(setNotificationAction({ variant: "success", message: "ユーザー情報を更新しました。" }));
          }, 1000);
        })
        .catch(() => {
          setTimeout(() => {
            dispatch(setNotificationAction({ variant: "error", message: "ユーザー情報の更新に失敗しました。" }));
          }, 400);
        });
    } else {
      dispatch(push("/signin"));
    }
  };
};

export const editImage = (image) => {
  return async (dispatch) => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");
      const apiEndpoint = process.env.REACT_APP_API_URL + "auth";

      let form = new FormData();
      form.append("image", image);

      axios
        .patch(apiEndpoint, form, {
          headers: {
            "content-type": "multipart/form-data",
            "access-token": auth_token,
            client: client,
            uid: uid,
          },
        })
        .then((resp) => {
          dispatch(editUserImageAction(resp.data.data));

          setTimeout(() => {
            dispatch(setNotificationAction({ variant: "success", message: "画像を更新しました。" }));
          }, 0);
        })
        .catch(() => {
          setTimeout(() => {
            dispatch(setNotificationAction({ variant: "error", message: "画像の更新に失敗しました。" }));
          }, 400);
        });
    } else {
      dispatch(push("/signin"));
    }
  };
};

export const deleteImage = () => {
  return async (dispatch) => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");
      const apiEndpoint = process.env.REACT_APP_API_URL + "auth";

      const body = { image: "" };
      
      axios
        .patch(apiEndpoint, body, {
          headers: {
            "access-token": auth_token,
            client: client,
            uid: uid,
          },
        })
        .then(() => {
          dispatch(deleteUserImageAction());
          
          setTimeout(() => {
            dispatch(setNotificationAction({ variant: "success", message: "画像をデフォルトに変更しました。" }));
          }, 0);
        })
        .catch(() => {
          setTimeout(() => {
            dispatch(setNotificationAction({ variant: "error", message: "画像の更新に失敗しました。" }));
          }, 400);
        });
    } else {
      dispatch(push("/signin"));
    }
  };
};

export const editPassword = (current_password, password, password_confirmation) => {
  return async (dispatch) => {
    if(!isValidRequiredInput(current_password, password, password_confirmation)) {
      alert("未入力の項目があります");
      return false;
    }
    
    if (!isValidPassword(password, password_confirmation)) {
      alert("新しいパスワードと新しいパスワード（確認用）が一致しません");
      return false;
    }

    if(password.length < 6) {
      alert("パスワードは６文字以上で入力してください");
      return false;
    }
    
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");
      const apiEndpoint = process.env.REACT_APP_API_URL + "auth/password";

      const body = { current_password: current_password, password: password, password_confirmation: password_confirmation };
      
      axios
        .put(apiEndpoint, body, {
          headers: {
            "access-token": auth_token,
            client: client,
            uid: uid,
          },
        })
        .then(() => {
          dispatch(showLoadingAction("Update Password ..."));
          dispatch(push("/dashboard"));

          setTimeout(() => {
            dispatch(hideLoadingAction());
            dispatch(setNotificationAction({ variant: "success", message: "パスワードを更新しました。" }));
          }, 1000);
        })
        .catch(() => {
          setTimeout(() => {
            dispatch(setNotificationAction({ variant: "error", message: "パスワードの更新に失敗しました。入力内容をご確認ください。" }));
          }, 400);
        });
    } else {
      dispatch(push("/signin"));
    }
  };
};

export const forgetPassword = (email) => {
  return async (dispatch) => {
    const apiEndpoint = process.env.REACT_APP_API_URL + "auth/password";
    const body = { email: email };

    axios
      .post(apiEndpoint, body)
      .then(() => {
        dispatch(showLoadingAction("Send Email ..."));
        dispatch(push("/forgetpassword/sent"));

        setTimeout(() => {
          dispatch(hideLoadingAction());
          dispatch(setNotificationAction({ variant: "success", message: "メールを送信しました。" }));
        }, 1000);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(setNotificationAction({ variant: "error", message: "メールの送信に失敗しました。メールアドレスをご確認ください。" }));
        }, 400);
      });
  };
};

export const resetPassword = (password, password_confirmation) => {
  return async (dispatch) => {
    const apiEndpoint = process.env.REACT_APP_API_URL + "auth/password";
    const body = { password: password, password_confirmation: password_confirmation };
    
    const params = new URLSearchParams(window.location.search);
    const auth_token = params.get("access-token");
    const client = params.get("client");
    const uid = params.get("uid");

    axios
      .put(apiEndpoint, body, {
        headers: {
          "access-token": auth_token,
          client: client,
          uid: uid,
        },
      })
      .then(() => {
        dispatch(showLoadingAction("Update Password ..."));
        dispatch(push("/signin"));

        setTimeout(() => {
          dispatch(hideLoadingAction());
          dispatch(setNotificationAction({ variant: "success", message: "パスワードを再設定しました。" }));
        }, 1000);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(setNotificationAction({ variant: "error", message: "パスワードの再設定に失敗しました。入力内容を確認するか初めからやり直してください。" }));
        }, 400);
      });
  };
};

export const listenAuthState = () => {
  return async (dispatch) => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");
      const apiEndpoint = process.env.REACT_APP_API_URL + "users/currentuser";

      axios
        .get(apiEndpoint, {
          headers: {
            "access-token": auth_token,
            client: client,
            uid: uid,
          },
        })
        .then((response) => {
          const userData = response.data;

          dispatch(signInAction({
            isSignedIn: true,
            uid: userData.uid,
            name: userData.name,
            image: userData.image,
            email: userData.email,
          }));
        })
        .catch((error) => {
          alert("サインインに失敗しました。");
        });
    } else {
      dispatch(push("/signin"));
    }
  };
};

export const redirectToDashboard = () => {
  return async (dispatch) => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");
      const apiEndpoint = process.env.REACT_APP_API_URL + "users/currentuser";

      axios
        .get(apiEndpoint, {
          headers: {
            "access-token": auth_token,
            client: client,
            uid: uid,
          },
        })
        .then((response) => {
          const userData = response.data;

          dispatch(signInAction({
            isSignedIn: true,
            uid: userData.uid,
            name: userData.name,
            image: userData.image,
            email: userData.email,
          }));
          
          dispatch(push("/dashboard"));
        });
    }
  };
};