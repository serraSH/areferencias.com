import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../Navigation/Nav';
import '../App.css';
import M from "materialize-css/dist/js/materialize.min.js";

function Profile(){

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');
    const [selectedStars, setSelectedStars] = useState(1);
    const [company, setCompany] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([0]);


    const sendComment = () => {

            const token = localStorage.getItem('token');

            if(!token){
                navigate('/');
            }else{
                axios({
                    method:'POST',
                    url:'http://localhost:8080/api/add_comment',
                    headers:{
                        'authorization': token
                    },
                    data:{
                        Company:company,
                        Comment:comment,
                        Stars:selectedStars,
                        Email:email,
                        Name:user
                    }
                }).then(res => {
                    console.log("Comment sent.");
                    M.toast({html: 'Comentario en revision. Pronto sera publicado.'});
                    setCompany('');
                    setComment('');
                    get_comments();
                });
            }
    }

    function Stars(){

        const [stars, setStars] = useState([1,2,3,4,5]);
        
        return(
           <div>{
            stars.map((star, index) => {
                if(selectedStars>index && (selectedStars==1)){
                    return(
                        <i key={star} onClick={e => setSelectedStars(star)} className="material-icons left selected_rating_star">star</i>
                     )
                }else if(selectedStars>index && (selectedStars==2||selectedStars==3)){
                    return(
                        <i key={star} onClick={e => setSelectedStars(star)} className="material-icons left selected_rating_star_2_3">star</i>
                     )
                }
                else if(selectedStars>index && (selectedStars==4||selectedStars==5)){
                    return(
                        <i key={star} onClick={e => setSelectedStars(star)} className="material-icons left selected_rating_star_4_5">star</i>
                     )
                }
                else{
                    return(
                        <i key={star} onClick={e => setSelectedStars(star)} className="material-icons left rating_star">star_border</i>
                     )
                }
           })}</div>
        )
    }
    
    useEffect(()=>{
        
        const token = localStorage.getItem('token');

        if(!token){
            navigate('/');
        }else{
            axios({
                method:'POST',
                url:'http://localhost:8080/api/get_user',
                headers:{
                    'authorization': token
                }
            }).then((res)=> {setEmail(res.data.Usuario.email);setUser(res.data.Usuario.info.name);});
        }
    },[0])

    const tryComment = () => {
        
    }

    const get_comments = async () => {
        const token = localStorage.getItem('token');

        if(!token){
            navigate('/');
        }else{
            await axios({
                method:'POST',
                url:'http://localhost:8080/api/get_comments',
                headers:{
                    'authorization': token
                }
            }).then((res) => {setComments(res.data);});
        }
    }

    useEffect(()=>{
        get_comments();
    },[0]);

    const ViewComments = () => {
        const arr = [];
        return(
            <div>
            {comments.map((comments, index) => {
                const arr = [comments.Stars];
                return(
                    <div key={comments._id} className="card grey lighten-4">
                        <div className="row">
                            <div  className="card-content blue-text">
                                <div>
                                <div className='col s4'><i className="material-icons left">face</i>{comments.Name}</div>
                                    {
                                        arr.map((stars,index) => {
                                            if(stars==1){
                                                console.log(stars);
                                                return(
                                                    <div key={index} className='col s8'>
                                                       <i className="material-icons right selected_rating_star">star</i>
                                                    </div>
                                                 )
                                            }else if(stars==2){
                                                return(
                                                    <div key={index} className='col s8'>
                                                        <i className="material-icons right selected_rating_star_2_3">star</i>
                                                        <i className="material-icons right selected_rating_star_2_3">star</i>
                                                    </div>
                                                 )
                                            }
                                            else if(stars==3){
                                                return(
                                                    <div key={index} className='col s8'>
                                                        <i className="material-icons right selected_rating_star_2_3">star</i>
                                                        <i className="material-icons right selected_rating_star_2_3">star</i>
                                                        <i className="material-icons right selected_rating_star_2_3">star</i>
                                                    </div>
                                                 )
                                            }
                                            else if(stars==4){
                                                return(
                                                    <div key={index} className='col s8'>
                                                        <i className="material-icons right selected_rating_star_4_5">star</i>
                                                        <i className="material-icons right selected_rating_star_4_5">star</i>
                                                        <i className="material-icons right selected_rating_star_4_5">star</i>
                                                        <i className="material-icons right selected_rating_star_4_5">star</i>
                                                    </div>                                                 )
                                            }
                                            else if(stars==5){
                                                return(
                                                    <div key={index} className='col s8'>
                                                        <i className="material-icons right selected_rating_star_4_5">star</i>
                                                        <i className="material-icons right selected_rating_star_4_5">star</i>
                                                        <i className="material-icons right selected_rating_star_4_5">star</i>
                                                        <i className="material-icons right selected_rating_star_4_5">star</i>
                                                        <i className="material-icons right selected_rating_star_4_5">star</i>
                                                    </div>
                                                 )
                                            }
                                        })
                                    }
                                </div>
                                <div className="input-field col s12 comments_card">
                                    <span className='company_comments_style'>Empresa:</span> <b>{comments.Company}</b>
                                    <div>
                                        <p className='comment_text'>{comments.Comment}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>
        )
    }
       
    return(
        <div>
            <Nav user={{User:user}}/>
            <div className="row  comment_row">
            <blockquote>
            Nueva evaluacion
            </blockquote>
            <div className="card grey lighten-4">
                <div className="row">
                    <div className="card-content white-text">
                        <div className="input-field col s12">
                            <input onChange={e => setCompany(e.target.value)} value={company} placeholder='Empresa' />
                        </div>
                        <div className="input-field col s12">
                            <textarea onChange={e => setComment(e.target.value)} value={comment} id="textarea1" className="materialize-textarea"></textarea>
                            <label htmlFor="textarea1">Comentarios</label>
                        </div>
                        <div className="input-field col s12">
                            <Stars />
                        </div>
                        <div className="input-field col s12">
                            <button onClick={sendComment} disabled={!company || !comment} className="btn waves-effect waves-light" type="submit" name="action" >Enviar
                            <i className="material-icons right">send</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <blockquote>
            Evaluaciones/Comentarios
            </blockquote>
                <ViewComments />
            </div>
        </div>
    )

}

export default Profile;