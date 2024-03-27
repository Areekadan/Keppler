import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Title from "../components/Title";
import { getProfile, updateProfile } from "../features/profiles/profileSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { profile, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.profile
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [license, setLicense] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (profile) {
      setPhoneNumber(profile.phone_number || "");
      setAboutMe(profile.about_me || "");
      setLicense(profile.license || "");
      setGender(profile.gender || "");
      setCountry(profile.country || "");
      setCity(profile.city || "");
    }
  }, [isError, message, profile]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProfileData = new FormData();
    updatedProfileData.append("phone_number", phoneNumber);
    updatedProfileData.append("about_me", aboutMe);
    updatedProfileData.append("license", license);
    updatedProfileData.append("gender", gender);
    updatedProfileData.append("country", country);
    updatedProfileData.append("city", city);
    if (profilePhoto) {
      updatedProfileData.append("profile_photo", profilePhoto);
    }

    try {
      await dispatch(
        updateProfile({
          username: profile.username,
          profileData: updatedProfileData,
        })
      ).unwrap();
      dispatch(getProfile());
      toast.success("Profile updated successfully");
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
      if (rejectedValueOrSerializedError.hasOwnProperty("profile")) {
        Object.keys(rejectedValueOrSerializedError.profile).forEach((key) => {
          const errorMessage = rejectedValueOrSerializedError.profile[key][0];
          toast.error(`${key}: ${errorMessage}`);
        });
      } else {
        let errorMessage = "An unexpected error occurred.";
        if (typeof rejectedValueOrSerializedError === "string") {
          errorMessage = rejectedValueOrSerializedError;
        } else if (rejectedValueOrSerializedError.hasOwnProperty("message")) {
          errorMessage = rejectedValueOrSerializedError.message;
        }
        toast.error(errorMessage);
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Title title="Edit Your Profile | Keppler" />
      <Container className="mg-top">
        <Row className="justify-content-center mb-4">
          <Col lg={8}>
            <h1 className="text-center mb-4">Edit Your Profile</h1>
            <hr className="my-2" />
            <Form onSubmit={submitHandler}>
              {profile.profile_photo && (
                <Row className="mb-4">
                  <Col className="text-center">
                    {profile.profile_photo && (
                      <Image
                        className="profile-image border"
                        src={profile.profile_photo}
                        roundedCircle
                        style={{ width: "150px", height: "150px" }}
                      />
                    )}
                  </Col>
                </Row>
              )}
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Profile Photo</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setProfilePhoto(e.target.files[0])}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>About Me</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Tell us about yourself"
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>License</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your professional license (optional)"
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="text-center">
                <Button variant="primary" type="submit">
                  Update Profile
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
