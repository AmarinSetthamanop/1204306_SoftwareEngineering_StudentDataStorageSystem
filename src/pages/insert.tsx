import { TextField, Button, Select, MenuItem, Card } from "@mui/material";
import { Container } from "@mui/system";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function InsertPage() {
  
  const [error, seterror] = useState("");
  const navigate = useNavigate();

  const IDRef = useRef<HTMLInputElement>();
  const noRef = useRef<HTMLInputElement>();
  const nameRef = useRef<HTMLInputElement>();
  const nicknameRef = useRef<HTMLInputElement>();
  const dayRef = useRef<HTMLInputElement>();
  const moRef = useRef<HTMLInputElement>();
  const yearRef = useRef<HTMLInputElement>();
  // เรียกใช้ข้อมูลจาก localStorage
  function can() {
    navigate("/home");
  }

  function add() {
    if (
      IDRef.current?.value != null &&
      noRef.current?.value != null &&
      nameRef.current?.value != null &&
      nicknameRef.current?.value != null &&
      dayRef.current?.value != null &&
      moRef.current?.value != null &&
      yearRef.current?.value != null
    ) {
      console.log(IDRef);
      const newData = {
        id: IDRef.current?.value,
        no: noRef.current?.value,
        fname: nameRef.current?.value,
        nickname: nicknameRef.current?.value,
        date: {
          day: dayRef.current?.value,
          mo: moRef.current?.value,
          year: yearRef.current?.value,
        },
      };

      // ดึงข้อมูลที่มีอยู่ใน localStorage ออกมา
      const existingData = JSON.parse(localStorage.getItem("objStr") || "[]");

      // เพิ่มข้อมูลใหม่ลงในอาร์เรย์ที่มีอยู่
      existingData.push(newData);

      // อัปเดตข้อมูลใน localStorage
      localStorage.setItem("objStr", JSON.stringify(existingData));

      navigate("/home");
    } else {
      seterror("1");
      console.log(error);
    }
  }

  return (
    <div style={{ display: "flex"}}>
        
      <Container >
      <Card sx={{display: "flex", justifyContent:'center',marginTop:2,borderRadius:20,backgroundColor:"pink"}}>
        {
          <div style={{ display: "flex", flexDirection: "column" }}>
            
            <h2>เพิ่มข้อมูล</h2>

            {error &&( 
            <h3>!! กรุณาใส่ข้อมูลให้ครบ !!</h3>)}

            <TextField
            
              sx={{ marginTop: 2 ,background:'white'}}
               placeholder="รหัสนิสิต"
              inputRef={IDRef}
              type="number"
              color="primary"
               
            ></TextField>
            {/* <TextField sx={{marginTop:2}}  placeholder="ชื่อนำหน้า" inputRef={noRef}></TextField> */}
            <Select 
             
            
            inputRef={noRef} sx={{ marginTop: 2,background:'white' }}>
               
              <MenuItem value={"นาย"}>นาย</MenuItem>
              <MenuItem value={"นาง"}>นาง</MenuItem>
              <MenuItem value={"นางสาว"}>นางสาว</MenuItem>
            </Select>
            <TextField
              sx={{ marginTop: 2,background:'white' }}
               placeholder="ชื่อ-นามสกุล"
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

            <TextField
              sx={{ marginTop: 2,background:'white' }}
               placeholder="ชื่อเล่น"
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
            ></TextField>
            <TextField
              sx={{ marginTop: 2 ,background:'white'}}
               placeholder="วันที่เกิด"
              inputRef={dayRef}
              type="number"
            ></TextField>
            <TextField
              sx={{ marginTop: 2,background:'white' }}
               placeholder="เดือนที่เกิด"
              inputRef={moRef}
              type="number"
            ></TextField>
            <TextField
              sx={{ marginTop: 2 ,background:'white'}}
               placeholder="ปีัที่เกิด"
              inputRef={yearRef}
              type="number"
            ></TextField>
            <Button
              sx={{ marginTop: 2 }}
              onClick={() => add()}
              variant="contained"
            >
              Add
            </Button>
            <Button
              sx={{ marginTop: 2,marginBottom:2 }}
              onClick={can}
              variant="contained"
              color="error"
            >
              cancel
            </Button>
            {/* </div> */}
          </div>
        }
        
        </Card>
      </Container>
      
    </div>
  );
}

export default InsertPage;
