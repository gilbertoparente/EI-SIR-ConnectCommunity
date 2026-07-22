import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

import {

    getProfile,

    updateProfile

} from "../services/profileService";

function Profile() {

    const [formData, setFormData] = useState({

        name: "",

        email: "",

        course: "",

        year: "",

        university: "",

        bio: "",

        currentPassword: "",

        newPassword: "",

        confirmPassword: ""

    });


    const { updateUser } = useAuth();
    
    const [message, setMessage] = useState("");

    const [error, setError] = useState("");

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const profile = await getProfile();

            setFormData(previous => ({

                ...previous,

                name: profile.name || "",

                email: profile.email || "",

                course: profile.course || "",

                year: profile.year || "",

                university: profile.university || "",

                bio: profile.bio || ""

            }));

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");

        setError("");

        if (

            formData.newPassword !== "" &&

            formData.newPassword !== formData.confirmPassword

        ) {

            setError("As passwords não coincidem.");

            return;

        }

        try {

            const response = await updateProfile(formData);

            setMessage(response.message);

            updateUser(response.user);

            setFormData(previous => ({

                ...previous,

                currentPassword: "",

                newPassword: "",

                confirmPassword: ""

            }));

        }

        catch (error) {

            setError(

                error.response?.data?.message ||

                "Erro ao atualizar perfil."

            );

        }

    };

    return (

        <div className="container py-4">

            <div className="card shadow-sm">

                <div className="card-header bg-primary text-white">

                    <h4 className="mb-0">

                        O Meu Perfil

                    </h4>

                </div>

                <div className="card-body">

                    {

                        message && (

                            <div className="alert alert-success">

                                {message}

                            </div>

                        )

                    }

                    {

                        error && (

                            <div className="alert alert-danger">

                                {error}

                            </div>

                        )

                    }

                    <form onSubmit={handleSubmit}>

                        <div className="row">
                        <div className="col-md-6 mb-3">

                            <label className="form-label">

                                Nome

                            </label>

                            <input

                                type="text"

                                name="name"

                                className="form-control"

                                value={formData.name}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">

                                Email

                            </label>

                            <input

                                type="email"

                                name="email"

                                className="form-control"

                                value={formData.email}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">

                                Curso

                            </label>

                            <input

                                type="text"

                                name="course"

                                className="form-control"

                                value={formData.course}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">

                                Ano

                            </label>

                            <input

                                type="number"

                                name="year"

                                className="form-control"

                                value={formData.year}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="col-md-12 mb-3">

                            <label className="form-label">

                                Universidade

                            </label>

                            <input

                                type="text"

                                name="university"

                                className="form-control"

                                value={formData.university}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="col-md-12 mb-4">

                            <label className="form-label">

                                Biografia

                            </label>

                            <textarea

                                rows="4"

                                name="bio"

                                className="form-control"

                                value={formData.bio}

                                onChange={handleChange}

                            />

                        </div>

                        <hr className="my-4" />

                        <h5 className="mb-3">

                            Alterar Password

                        </h5>

                        <div className="col-md-4 mb-3">

                            <label className="form-label">

                                Password Atual

                            </label>

                            <input

                                type="password"

                                name="currentPassword"

                                className="form-control"

                                value={formData.currentPassword}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="col-md-4 mb-3">

                            <label className="form-label">

                                Nova Password

                            </label>

                            <input

                                type="password"

                                name="newPassword"

                                className="form-control"

                                value={formData.newPassword}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="col-md-4 mb-4">

                            <label className="form-label">

                                Confirmar Password

                            </label>

                            <input

                                type="password"

                                name="confirmPassword"

                                className="form-control"

                                value={formData.confirmPassword}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="col-12 text-end">

                            <button

                                className="btn btn-primary px-4"

                                type="submit"

                            >

                                Guardar Alterações

                            </button>

                        </div>

                    </div>

                </form>

            </div>

        </div>

    </div>

);

}

export default Profile;