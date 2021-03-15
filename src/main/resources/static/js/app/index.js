    const save = document.getElementById("btn-save");
    const update = document.getElementById("btn-update");
    const del = document.getElementById("btn-del");

    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const content = document.getElementById("content");

    function handleSaveClick(){
        let opt = {
            method : "POST",
            headers: {
            "Content-Type" : "application/json; charset=utf-8",
            },
            body : JSON.stringify({
                title:title.value,
                content:content.value,
                author:author.value,
            }),
        };

        fetch("/api/v1/posts", opt)
        .then((response) => {
            console.log(response);
            alert("글이 등록되었습니다.");
            window.location.href = "/";
         })
        .catch((error) => console.log(error));
    }

    function handleUpdateClick(){
        let opt = {
            method : "PUT",
            headers : {  "Content-Type" : "application/json; charset=utf-8",
            },
            body : JSON.stringify({
                title:title.value,
                content:content.value,
                author:author.value,
            }),
        };
        let id = document.getElementById("id");

        fetch('/api/v1/posts/'+id.value, opt)
        .then(response => {
            console.log(response);
            alert("글이 수정되었습니다.");
            window.location.href = "/";
        }).catch((error) => console.log(error));
    }

    function handleDeleteClick(){
        let opt = {
            method : "DELETE",
            headers : {  "Content-Type" : "application/json; charset=utf-8",
            },
            body : JSON.stringify({
                title:title.value,
                content:content.value,
                author:author.value,
            }),
        };
        let id = document.getElementById("id");

        fetch('/api/v1/posts/'+id.value, opt)
            .then(response => {
                console.log(response);
                alert("글이 삭제되었습니다.");
                window.location.href = "/";
            }).catch((error) => console.log(error));
    }
    const init = function(){
        if(save){
            save.addEventListener("click", handleSaveClick);
        }
        if(update){
            update.addEventListener("click", handleUpdateClick);
        }

        if(del){
            del.addEventListener("click", handleDeleteClick);

        }
    };

init();


