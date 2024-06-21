import React, { useContext, useEffect, useState } from 'react';
import { mailcontext } from '../App';
import axios from 'axios';
import './Userprofile.css';

function UserProfile() {
    const [mail, setMail] = useContext(mailcontext);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        console.log(mail);
        axios.get(`http://localhost:8080/api/auth/profile/${mail}`).then(response => {
            setProfile(response.data);

        });
    }, [mail]);

    return profile ? (
        <div className='profile-container'>
          <h1>{profile.name}'s profile</h1>
            <table>
                <tbody>
                    <tr>
                    <td>
                    <img src={`data:image/png;base64,${profile.image}`} alt="profileimage" className="profile-image"  style={{ maxWidth: '300px' }} />
                   </td>
                    </tr>
                    <tr>
                        <td id='label'>Email:</td>
                        <td id='output'>{profile.email}</td>
                    </tr>
                    <tr>
                        <td id='label'>Name:</td>
                        <td id='output'>{profile.name}</td>
                    </tr>
                    <tr>
                        <td id='label'>Mobile Number:</td>
                        <td id='output'>{profile.mobilenumber}</td>
                    </tr>
                    <tr>
                        <td id='label'>Address:</td>
                        <td id='output'>{profile.address}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    ) : (
        <div>Profile not found</div>
    );
}

export default UserProfile;
