import { Button, Card, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { Usermodel } from "../jsons/model/user";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const [User, setUser] = useState<Usermodel[]>([]);

  const currentYear = new Date().getFullYear();
  const [searchText, setSearchText] = useState<string>("");

  const idRef = useRef<HTMLInputElement>();
  const nameRef = useRef<HTMLInputElement>();


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    console.log(searchText);
  };



  const [searchName, setSearchNAme] = useState<string>("");
  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchNAme(event.target.value);
    console.log(searchName);
  };

  function insert() {
    navigate("/insert");
  }

  function edit(id: number) {
    navigate("/edit/?index=" + id);
  }


  // เรียกใช้ข้อมูลจาก localStorage
  const storedData = localStorage.getItem("objStr");
  // แปลงข้อมูลใน localStorage เป็น object
  const storedObj = storedData ? JSON.parse(storedData) : [];




  const del = (id: number) => {
    // ลบข้อมูลที่ index 1
    storedObj.splice(id, 1);
    // เก็บข้อมูลที่เหลือลงใน localStorage อีกครั้ง
    localStorage.setItem("objStr", JSON.stringify(storedObj));
    setUser(storedObj);
    console.log(localStorage.getItem("objStr"));
  };




  useEffect(() => {
    setUser(storedObj);
    console.log(localStorage.getItem("objStr"));
  }, []);




  // const [data,setdata]=useState(data1);




  return (
    <div style={{backgroundColor:"pink", height: "1200px"}}>
      <Container sx={{ display:'flex',justifyContent:'center'}}>
        <div style={{ display: "flex", flexDirection: "column",width :"70%" ,marginTop:50}}>

          <h1>ระบบจัดเก็บข้อมูลนิสิต</h1>

          <TextField
            sx={{ backgroundColor: "white" }}
            label="ID"
            onChange={handleChange}
            inputRef={idRef}
            type="number"
          >
            {" "}
          </TextField>
          <TextField
            sx={{ backgroundColor: "white", marginTop: 5 }}
            label="NAME"
            onChange={handleChange2}
            inputRef={nameRef}
          >
            {" "}
          </TextField>

          <Card sx={{ marginTop: 5 ,padding:5}}>
            {searchText !== ""
              ? User.filter((user) => user.id.includes(searchText)).map(
                  (user, index) => (
                    <div
                   
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignContent: "center",
                        justifyContent: "space-between",
                        marginTop:10
                      }}
                    >
                      <span style={{ marginRight: 10 }}>{"ID: "}{user.id}</span>
                      <span style={{ marginRight: 10 }}>{user.no}</span>
                      <span style={{ marginRight: 10 }}>{"ชื่อ: "}{user.fname}</span>
                      <span style={{ marginRight: 10 }}>{"อายุ: "}{currentYear - user.date.year}</span>
                      <Button variant="contained" onClick={() => edit(index)}>
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => del(index)}
                      >
                        Del
                      </Button>
                    </div>
                  )
                )
              : searchName !== ""
              ? User.filter((user) => user.fname.includes(searchName)).map(
                  (user, index) => (
                    <div
                   
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignContent: "center",
                        justifyContent: "space-between",
                        marginTop:10
                      }}
                    >
                      <span style={{ marginRight: 10 }}>{"ID: "}{user.id}</span>
                      <span style={{ marginRight: 10 }}>{user.no}</span>
                      <span style={{ marginRight: 10 }}>{"ชื่อ: "}{user.fname}</span>
                      <span style={{ marginRight: 10 }}>{"อายุ: "}{currentYear - user.date.year}</span>
                      <Button variant="contained" onClick={() => edit(index)}>
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => del(index)}
                      >
                        Del
                      </Button>
                    </div>
                  )
                )
              : User.map((user, index) => (
                  <div
                  key={index}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignContent: "center",
                      justifyContent: "space-between",
                      marginTop:10
                    }}
                  >
                    <span style={{ marginRight: 10 }}>{"ID: "}{user.id}</span>
                      <span style={{ marginRight: 10 }}>{user.no}</span>
                      <span style={{ marginRight: 10 }}>{"ชื่อ: "}{user.fname}</span>
                      <span style={{ marginRight: 10 }}>{"อายุ: "}{currentYear - user.date.year}</span>
                    <Button variant="contained" onClick={() => edit(index)}>
                      Edit
                    </Button>
                    <Button

                      variant="contained"
                      color="error"
                      onClick={() => del(index)}
                    >
                      Del
                    </Button>
                  </div>
                ))}
          </Card>
          <Button variant="contained" sx={{display:'flex',marginTop:2,width:"50%",placeitems: 'center'}} onClick={insert}> ADD User</Button>
        </div>
      </Container>
    </div>
  );
}

export default HomePage;
