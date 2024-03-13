import { useEffect, useRef, useState } from "react";
import { Usermodel } from "../jsons/model/user";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Card, Container, MenuItem, Select, TextField } from "@mui/material";

function EditPage() {
  const currentYear = new Date().getFullYear();
  const [User, setUser] = useState<Usermodel>();
  const [searchParams] = useSearchParams();
  const index = searchParams.get("index");
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const noRef = useRef<HTMLSelectElement>();
  const nameRef = useRef<HTMLInputElement>();
  const nicknameRef = useRef<HTMLInputElement>();
  const dayRef = useRef<HTMLInputElement>();
  const moRef = useRef<HTMLInputElement>();
  const yearRef = useRef<HTMLInputElement>();
  // เรียกใช้ข้อมูลจาก localStorage
  const storedData = localStorage.getItem("objStr");
  // แปลงข้อมูลใน localStorage เป็น object
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const storedObj = storedData ? JSON.parse(storedData) : [];

  useEffect(() => {
    setUser(storedObj[Number(index)]);
  }, [index]);

  function editbyindex() {
    if (
      noRef.current?.value !== "" &&
      nameRef.current?.value !== "" &&
      nicknameRef.current?.value !== "" &&
      dayRef.current?.value !== "" &&
      moRef.current?.value !== "" &&
      yearRef.current?.value !== ""
    ) {
      const storedData = localStorage.getItem("objStr");
      
        if(Number(dayRef.current?.value)< 1 || Number(dayRef.current?.value)>31)
        {
            seterror("2");
            console.log(error);
        } 
        else if (Number(moRef.current?.value)< 1 || Number(moRef.current?.value)>12)
        {
            seterror("3");
            console.log(error);
        } 
        else if(Number(yearRef.current?.value)< 1 || Number(yearRef.current?.value)>currentYear)
        {
            seterror("4");
            console.log(error);
        } 
        else if (storedData) {
        const storedObj = JSON.parse(storedData);
        storedObj[Number(index)] = {
          ...storedObj[Number(index)],
          no: noRef.current?.value,
          fname: nameRef.current?.value,
          nickname: nicknameRef.current?.value,
          date: {
            ...storedObj[Number(index)].date,
            day: dayRef.current?.value,
            mo: moRef.current?.value,
            year: yearRef.current?.value,
          },
        };
        localStorage.setItem("objStr", JSON.stringify(storedObj));
        navigate("/home");
      }
    } 
    else {
      seterror("1");
      console.log(error);
    }
  }
  function can() {
    navigate("/home");
  }

  return (
   
      <Container >
        <Card sx={{padding:2,marginTop:5,backgroundColor:"pink"}}>
        {User ? (
          <div
            style={{ display: "flex", flexDirection: "column", color: "white" }}
          >
            {error == '1' &&( 
            <h3  style={{color:"black"}}>!! กรุณาใส่ข้อมูลให้ครบ !!</h3>
            )}

            {error == '2' &&( 
            <h3  style={{color:"black"}}>!! กรุณาใส่ข้อมูลวันที่ให้ถูกต้อง !!</h3>
            )}

            {error == '3' &&( 
            <h3  style={{color:"black"}}>!! กรุณาใส่ข้อมูลเดือนที่ให้ถูกต้อง !!</h3>
            )}

            {error == '4' &&( 
            <h3  style={{color:"black"}}>!! กรุณาใส่ข้อมูลปีที่ให้ถูกต้อง !!</h3>
            )}
            
            {/* <div > */}
            <h3 style={{color:"black"}}>รหัสนิสิต : {User?.id}</h3>

            <Select
                label="Age"
              defaultValue={User?.no}
              inputRef={noRef}
              sx={{ marginTop: 2, color: "black",background:'white'  }}
            >
              <MenuItem value={"นาย"}>นาย</MenuItem>
              <MenuItem value={"นาง"}>นาง</MenuItem>
              <MenuItem value={"นางสาว"}>นางสาว</MenuItem>
            </Select>

            <TextField
              sx={{ marginTop: 2 ,background:'white' }}
              placeholder="ชื่อ-นามสกุล"
              defaultValue={User?.fname}
              inputRef={nameRef}
              inputProps={{
                pattern: "[ก-๙เ-๛a-zA-Z]+", // รับเฉพาะตัวอักษรไทยและอังกฤษ
                type: "text", // ระบุ type เป็น "text"
                onKeyDown: (e) => {
                  const char = e.key;
                  // ตรวจสอบว่าเป็นตัวอักษรหรือสระภาษาไทยพร้อมวรรณยุกต์หรือไม่
                  if (!/[ก-๙เ-๛a-zA-Z]/.test(char) && char !== " ") {
                    e.preventDefault();
                  }
                },
              }}
            />
            {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////lk */}
            <TextField
              sx={{ marginTop: 2 ,background:'white' }}
              placeholder="ชื่อเล่น"
              defaultValue={User?.nickname}
              inputRef={nicknameRef}
              inputProps={{
                pattern: "[ก-๙เ-๛a-zA-Z]+", // รับเฉพาะตัวอักษรไทยและอังกฤษ
                type: "text", // ระบุ type เป็น "text"
                onKeyDown: (e) => {
                  const char = e.key;
                  // ตรวจสอบว่าเป็นตัวอักษรหรือสระภาษาไทยพร้อมวรรณยุกต์หรือไม่
                  if (!/[ก-๙เ-๛a-zA-Z]/.test(char) && char !== " ") {
                    e.preventDefault();
                  }
                },
              }}
            />

            <TextField
              sx={{ marginTop: 2 ,background:'white' }}
              placeholder="วันที่เกิด"
              defaultValue={User?.date.day}
              inputRef={dayRef}
              type="number"
              inputProps={{
                min: 1,
                max: 31,
                step: 1,
                
              }}
            ></TextField>
            <TextField 
              sx={{ marginTop: 2 ,background:'white' }}
              placeholder="เดือนที่เกิด"
              defaultValue={User?.date.mo}
              inputRef={moRef}
              type="number"
              inputProps={{
                min: 1,
                max: 12,
                step: 1,
              }}
              
            ></TextField>
            <TextField
              sx={{ marginTop: 2 ,background:'white' }}
              placeholder="ปีัที่เกิด"
              defaultValue={User?.date.year}
              inputRef={yearRef}
              type="number"
              inputProps={{
                min: 0,
                max: currentYear,
                step: 1,
              }}
            ></TextField>
            <Button
              sx={{ marginTop: 2  }}
              onClick={() => editbyindex()}
              variant="contained"
            >
              save
            </Button>
            <Button
              sx={{ marginTop: 2  }}
              onClick={can}
              variant="contained"
              color="error"
            >
              cancel
            </Button>
            {/* </div> */}
          </div>
        ) : (
          <>sad</>
        )}
        </Card>
      </Container>
   
  );
}

export default EditPage;
