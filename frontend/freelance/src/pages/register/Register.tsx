import { useForm, Controller } from "react-hook-form";
import { Row, Col, Form, Input, Select, Button, message } from "antd";
import { RegistrationFormValues } from "./types/register.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "./resolver/zod.resolver";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSkills } from "../../api/skills.api";
import { registerUser } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const { Option } = Select;

export const Register = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
  });
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";
  const navigate = useNavigate();
  const { data: skillOptions } = useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
  });
  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const mutation = useMutation({
    mutationKey: ["UserRegister"],
    mutationFn: registerUser,
    onSuccess: () => {
      console.log("User succesfully register");
      messageApi.open({
        key,
        type: "success",
        content: "User register successfully",
      });
      navigate("/");
    },
    onError: (err) => {
      console.log(err);
      messageApi.open({
        key,
        type: "error",
        content: "User register failed",
      });
    },
  });
  const role = watch("role");
  const handleForm = (data: any) => {
    if (data.role === "client") data.skills = null;
    console.log("Form Data:", data);
    if (data.profileImage && data.profileImage[0]) {
      data.profileImage = data.profileImage[0].originFileObj;
    }
    mutation.mutate(data);
    messageApi.open({
      key,
      type: "loading",
      content: "Please wait",
    });
  };

  return (
    <Row justify="center" className="p-8">
      {contextHolder}

      <Col xs={24} sm={20} md={16} lg={12}>
        <form onSubmit={handleSubmit(handleForm)} className="w-[30rem]">
          <div style={{ marginBottom: 16 }}>
            <label>Name</label>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input {...field} placeholder="Enter your name" />
              )}
            />
            <p className=" text-red-500 m-1 rounded-lg pl-2">
              {errors.name ? errors.name.message : ""}
            </p>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>Email</label>
            <input
              className="w-full h-8 p-2 rounded-sm"
              {...register("email")}
              placeholder="Enter your email"
            />
            {errors.email && (
              <span style={{ color: "red", fontSize: "0.875rem" }}>
                {errors.email?.message || "Invalid email"}
              </span>
            )}
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>Password</label>
            <input
              className="w-full h-8 p-2 rounded-sm"
              type="password"
              {...register("password")}
              placeholder="Enter your password"
            />
            {errors.password && (
              <span style={{ color: "red", fontSize: "0.875rem" }}>
                {errors.password?.message || "Password is required"}
              </span>
            )}
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>Confirm Password</label>
            <input
              className="w-full h-8 p-2 rounded-sm"
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <span style={{ color: "red", fontSize: "0.875rem" }}>
                {errors.confirmPassword?.message ||
                  "Password confirmation is required"}
              </span>
            )}
          </div>

          <Form.Item label="Role">
            <Controller
              control={control}
              name="role"
              render={({ field }) => (
                <Select {...field} placeholder="Select a role">
                  <Option value="client">Client</Option>
                  <Option value="freelancer">Freelancer</Option>
                </Select>
              )}
            />
            {errors.role && (
              <span style={{ color: "red", fontSize: "0.875rem" }}>
                {errors.role?.message || "Role is required"}
              </span>
            )}
          </Form.Item>

          {role === "freelancer" && (
            <>
              <Form.Item label="Skills">
                <Controller
                  control={control}
                  name="skills"
                  render={({ field }) => (
                    <Select
                      {...field}
                      mode="multiple"
                      placeholder="Select your skills"
                    >
                      {skillOptions?.map((ele) => (
                        <Option key={ele.id} value={ele.name}>
                          {" "}
                          {ele.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                />
                {errors.skills && (
                  <span style={{ color: "red", fontSize: "0.875rem" }}>
                    {errors.skills?.message || "Skills are required"}
                  </span>
                )}
              </Form.Item>
            </>
          )}

          <div style={{ marginBottom: 16 }}>
            <label>Bio</label>
            <textarea
              className="w-full rounded-md "
              maxLength={255}
              rows={5}
              {...register("bio")}
              placeholder="Tell something about yourself"
            />
            {errors.bio && (
              <span style={{ color: "red", fontSize: "0.875rem" }}>
                {errors.bio?.message || "Bio is required"}
              </span>
            )}
          </div>

          <Controller
            control={control}
            name="profileImage"
            render={({ field }) => (
              <div className="mb-4">
                <label
                  htmlFor="profileImage"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Upload Profile Image
                </label>
                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                  className="block w-full text-sm text-gray-700 file:border file:border-gray-300 file:rounded-md file:px-4 file:py-2 file:bg-blue-50 hover:file:bg-blue-100"
                />
                {errors.profileImage && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.profileImage.message}
                  </p>
                )}
              </div>
            )}
          />

          {errors.profileImage && (
            <span style={{ color: "red", fontSize: "0.875rem" }}>
              {errors.profileImage?.message || "Profile image is required"}
            </span>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              disabled={mutation.isPending}
            >
              Register
            </Button>
          </Form.Item>
        </form>
      </Col>
    </Row>
  );
};
