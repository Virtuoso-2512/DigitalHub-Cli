import Button from '../../../components/button';
import { GlobalState } from '../../../GlobalParent';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { non_teaching_types } from "../../../ENV";

export default function Post_VMD() {
    const {get} = GlobalState(), [posts, setPosts] = useState([]);

    useEffect(async() => {
        const res = await get("post/");
        setPosts(res.posts);
    }, [])

    return <div style={{padding:"1vw 3vw"}} id="post">
        <div style={{display:"flex",justifyContent:"space-between"}}>
            <h2 style={{textAlign:"center"}}>Manage Your Posts ({posts.length} Post{posts.length ===1 ? "" : "s"})</h2>
            <Link to="/posts/new"><Button variant={4}><i className='fas fa-add'/> New Post</Button></Link>
        </div>
        <span style={{textAlign:"center",marginBottom:"20px"}}>Posts are ONLY for Faculty under Non-Teaching Department</span>
        <br/>
        <br/>
        <table>
            <thead>
                <tr>
                    <th>Post Name</th>
                    <th>Post Type</th>
                    <th>No. of Users</th>
                    <th>Last Updated at  <i className='fas fa-arrow-down' style={{marginLeft:"10px"}}/></th>
                </tr>
            </thead>
            <tbody>
                {posts.length ? posts.map(post => <tr>
                    <td style={{height:"4em"}}><Link to={"/posts/manage/"+post._id}><Button variant={2} style={{padding:"8px 12px",margin:0}}>{post?.name}</Button></Link></td>
                    <td>{non_teaching_types[post?.type]}</td>
                    <UserCount id={post._id}/>
                    <td>{new Date(post.updatedAt).toLocaleString()}</td>
                </tr>) : <><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/></>}
            </tbody>
        </table>
    </div>;
}

function UserCount({id}){
    const {get} = GlobalState(), [count, setCount] = useState(0);

    useEffect(async() => {
        const counter = await get("post/count?id="+id);
        setCount(counter.count)
    }, [])
    

    return <td>{count} User{count === 1 ? "" : "s"}</td>
}

function LeadSkeleton(){
    return <tr style={{width:"100%"}}>
        <td><h1 className="loader"/></td>
        <td><h1 className="loader"/></td>
        <td><h1 className="loader"/></td>
        <td><h1 className="loader"/></td>
    </tr>;
}