import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FirstPage() {
    
    const navigate = useNavigate();


    function loadData() {
        const obj = [
            {
                "id":"64011212095",
                "no":"นาย",
                "fname":"วรวุฒิ ภาคบัว",
                "nickname":"god",
                "date":{
                    "day":1,
                    "mo":8,
                    "year":2002
                }
            },
            {
                "id":"64011212157",
                "no":"นาย",
                "fname":"dsfsd",
                "nickname":"dfgd",
                "date":{
                    "day":1,
                    "mo":8,
                    "year":2002
                }
            },
            {
                "id":"64011215635",
                "no":"นาย",
                "fname":"oil",
                "nickname":"earth",
                "date":{
                    "day":1,
                    "mo":8,
                    "year":2002
                }
            },
            {
                "id":"64011212458",
                "no":"นาย",
                "fname":"123",
                "nickname":"564",
                "date":{
                    "day":1,
                    "mo":8,
                    "year":2002
                }
            }
          ];
          localStorage.setItem("objStr", JSON.stringify(obj));
    }

    
    useEffect(() => {
        
        if (localStorage.getItem('objStr') === null) {
            loadData();
            console.log("is loaded");
            navigate('/home')
        }
        else {
            navigate('/home')
            console.log("not load");
        }
        
    }, []);


    return (<>
    </>);
}