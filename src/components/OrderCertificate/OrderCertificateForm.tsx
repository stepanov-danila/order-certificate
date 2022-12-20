import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "../Buttons/Button";
import FieldBox from "../Form/FieldBox";
import Form from "../Form/Form";
import Textfield from "../Inputs/Textfield/Textfield";
import Select from "../Inputs/Select/Select";
import Fieldset from "../Form/Fieldset";
import {
  ApplicationGoalEnum,
  ApplicationPaperCopyEnum,
  ApplicationPaperOriginalEnum,
  ApplicationReceiverEnum,
  CertificateTypeEnum,
  EmploymentHistoryTypeEnum,
  OrderCertificateFormStateEnum,
  RoadGoalEnum,
} from "./enums";
import {
  CURRENT_YEAR,
  ELECTRONIC_EMPLOYMENT_HISTORY_TYPE_DESCRIPTION,
  fetchDataPlaceholder,
  initialFormPlaceholder,
  MIN_YEAR,
} from "./constants";
import { LocalizationProvider } from "@material-ui/pickers";
import moment from "moment";
import MomentAdapter from "@material-ui/pickers/adapter/moment";
import {
  // checkFiles,
  getFormPostData,
  getTitleFromArrayItem,
  getValidateSchema,
  setCertificateSubmitDisabled,
  getDefaultLegal,
  setYearMenuItemsArray,
  // watchFileToDocumentLibraryUploading,
} from "./utils";
import {
  FetchedDataType,
  GetCurrentEmployeeInfoDataType,
  initialFormPlaceholderType,
  PostOrderCertificateFormType,
} from "@order-certificate-types/fields";
import { api } from "../../api/api";
import DndUploader from "../DndUploader/DndUploader";
import UserTextInfo from "../User/UserTextInfo";
import { FieldsetPropsLabelPlacementEnum, ThemesEnum } from "../Form/enums";
import DateRangePicker from "../Inputs/DateRangePicker/DateRangePicker";
import { useDispatch, useSelector } from "react-redux";
import {
  selectApplicationGoal,
  selectCertificateType,
  selectStatus,
  selectUserInfo,
} from "../../redux/selectors";
import {
  changeApplicationGoal,
  changeCertificateType,
  // changeResultAction,
  changeStatus,
} from "../../redux/slice";
import { yupResolver } from "@hookform/resolvers/yup";
import Text from "../Text/Text";
import PageTitle from "../Titles/PageTitle";
import Preloader from "../../../AchievementsBoard/components/Preloader/Preloader";
import { H3 } from "../Titles/Titiles";
import PostResultShowcase from "./PostResultShowcase";
import MultipleSelect from "../Inputs/Select/MultipleSelect";

const OrderCertificateForm: React.FC = () => {
  const dispatch = useDispatch();

  const status: OrderCertificateFormStateEnum = useSelector(selectStatus);
  const certificateType: CertificateTypeEnum = useSelector(
    selectCertificateType
  );
  const applicationGoal: ApplicationGoalEnum = useSelector(
    selectApplicationGoal
  );
  const info: GetCurrentEmployeeInfoDataType = useSelector(selectUserInfo);

  const [data, setData] = useState<FetchedDataType>(fetchDataPlaceholder);

  const schema = getValidateSchema(certificateType, applicationGoal);

  const { control, reset, watch, setValue, handleSubmit, formState } = useForm({
    defaultValues: initialFormPlaceholder,
    resolver: yupResolver(schema),
  });

  const form: initialFormPlaceholderType = watch();

  const errors = formState.errors as any;

  const fetchData = async () => {
    // You can await here
    const types = await api.getApplicationTypes();
    const goals = await api.getApplicationGoals();
    const history = await api.getEmploymentHistoryType();
    const roadGoals = await api.getRoadGoals();
    const papers = await api.getApplicationPapers();
    const receivers = await api.getApplicationReceivers();

    setData({
      info,
      types,
      goals,
      history,
      roadGoals,
      papers,
      receivers,
    } as FetchedDataType);

    setTimeout(() => {
      dispatch(changeStatus(OrderCertificateFormStateEnum.Fetched));
    }, 1000);
  };

  const initFormData = (
    {
      DepartmentId,
      DepartmentName,
      DivisionName,
      EmployeeName,
      Id,
      Legal,
      Position,
      TableNumber,
      Title,
    }: GetCurrentEmployeeInfoDataType,
    initData: initialFormPlaceholderType
  ) => {
    reset({
      ...initData,
      EmployeeName,
      EmployeePosition: Position,
      EmployeeId: TableNumber,
      EmployeeLegalId: getDefaultLegal(Legal).Id,
      EmployeeLogin: Title,
      // Title,
    });
  };

  const resultAction = () => {
    dispatch(changeStatus(OrderCertificateFormStateEnum.Fetched));
    initFormData(data.info, initialFormPlaceholder);
  };

  const onSubmit = () => {
    // event.preventDefault();

    const postData: PostOrderCertificateFormType = getFormPostData(form);

    const postDataJson = JSON.stringify(postData, (key, value) => {
      if (value.constructor.name === "Array") {
        return value.join(",");
      }
      return value;
    });

    console.log(postData);
    console.log(postDataJson);

    api
      .postApplicationRequest(form.CertificateType, postDataJson)
      .then((response) => {
        console.info("RESPONSE!", response);
        if (!!response?.Success) {
          dispatch(changeStatus(OrderCertificateFormStateEnum.Success));
        } else {
          dispatch(changeStatus(OrderCertificateFormStateEnum.Error));
        }
      })
      .catch((error) => {
        console.error("ERROR!", error);
        dispatch(changeStatus(OrderCertificateFormStateEnum.Error));
      });
  };

  // fetchind data
  useEffect(() => {
    fetchData();
  }, []);

  // init data
  useEffect(() => {
    console.log(data);

    if (data) {
      initFormData(data.info, initialFormPlaceholder);
      // dispatch(changeResultAction(resultAction));
    }
  }, [data]);

  // watch data
  useEffect(() => {
    console.log("form", form);
    console.log("errors", errors);
  }, [form, errors]);

  useEffect(() => {
    dispatch(changeCertificateType(form.CertificateType));
  }, [form.CertificateType, dispatch]);

  useEffect(() => {
    if (
      status === OrderCertificateFormStateEnum.Fetched &&
      form.EmploymentHistoryTypeId !== EmploymentHistoryTypeEnum.Empty
    ) {
      setValue(
        "EmploymentHistoryTypeValue",
        getTitleFromArrayItem(data.history, form.EmploymentHistoryTypeId),
        {
          shouldValidate: true,
          shouldDirty: true,
        }
      );
    }
  }, [form.EmploymentHistoryTypeId]);

  useEffect(() => {
    if (
      status === OrderCertificateFormStateEnum.Fetched &&
      form.ApplicationPaperOriginalId !== ApplicationPaperOriginalEnum.Empty
    ) {
      setValue(
        "ApplicationPaperOriginalValue",
        getTitleFromArrayItem(data.papers, form.ApplicationPaperOriginalId),
        {
          shouldValidate: true,
          shouldDirty: true,
        }
      );
    }
  }, [form.ApplicationPaperOriginalId]);

  useEffect(() => {
    if (
      status === OrderCertificateFormStateEnum.Fetched &&
      form.ApplicationPaperCopyId !== ApplicationPaperCopyEnum.Empty
    ) {
      setValue(
        "ApplicationPaperCopyValue",
        getTitleFromArrayItem(data.papers, form.ApplicationPaperCopyId),
        {
          shouldValidate: true,
          shouldDirty: true,
        }
      );
    }
  }, [form.ApplicationPaperCopyId]);

  useEffect(() => {
    if (
      status === OrderCertificateFormStateEnum.Fetched &&
      form.ApplicationGoalId !== ApplicationGoalEnum.Empty
    ) {
      setValue(
        "ApplicationGoalValue",
        getTitleFromArrayItem(data.goals, form.ApplicationGoalId),
        {
          shouldValidate: true,
          shouldDirty: true,
        }
      );
      dispatch(changeApplicationGoal(form.ApplicationGoalId));
    }
  }, [form.ApplicationGoalId]);

  useEffect(() => {
    if (
      status === OrderCertificateFormStateEnum.Fetched &&
      form.ApplicationReceiverId !== ApplicationReceiverEnum.Empty
    ) {
      setValue(
        "ApplicationReceiverValue",
        getTitleFromArrayItem(data.receivers, form.ApplicationReceiverId),
        {
          shouldValidate: true,
          shouldDirty: true,
        }
      );
    }
  }, [form.ApplicationReceiverId]);

  useEffect(() => {
    if (
      status === OrderCertificateFormStateEnum.Fetched &&
      form.RoadGoalId !== RoadGoalEnum.Empty
    ) {
      setValue(
        "RoadGoalValue",
        getTitleFromArrayItem(data.roadGoals, form.RoadGoalId),
        {
          shouldValidate: true,
          shouldDirty: true,
        }
      );
    }
  }, [form.RoadGoalId]);

  const CurrentEmployeeInfo = (
    <>
      <FieldBox
        head="Информация о получателе справки"
        body={
          <>
            <Fieldset
              label="ФИО и должность получателя"
              component={
                <UserTextInfo
                  title={form.EmployeeName}
                  text={form.EmployeePosition}
                  valid={!errors?.CertificateType}
                />
              }
            />
            <Fieldset
              label="Юридическое лицо"
              component={
                <>
                  {data.info.Legal.length > 1 ? (
                    <Controller
                      name="EmployeeLegalId"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          error={!!errors?.EmployeeLegalId}
                          items={data.info.Legal}
                        />
                      )}
                    />
                  ) : (
                    <H3>{getDefaultLegal(data.info.Legal).Title}</H3>
                  )}
                </>
              }
            />
          </>
        }
      />
    </>
  );

  const CertificateType = (
    <>
      <Fieldset
        label="Тип справки"
        component={
          <Controller
            name="CertificateType"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                error={!!errors?.CertificateType}
                items={data.types}
              />
            )}
          />
        }
      />
    </>
  );

  const Employment2NDFL = (
    <>
      <Fieldset
        label="Год"
        labelStyles={{ alignSelf: "flex-start", marginTop: "17px" }}
        component={
          <>
            <Controller
              name="Year"
              control={control}
              render={({ field }) => (
                <MultipleSelect
                  {...field}
                  error={!!errors?.Year}
                  items={setYearMenuItemsArray(CURRENT_YEAR, MIN_YEAR)}
                />
              )}
            />
            {errors?.Year?.type === "max" && (
              <Text style={{ color: "#dd2400", margin: "10px 0 0 0" }}>
                Можно выбрать не больше четырех значений
              </Text>
            )}
          </>
        }
      />
    </>
  );

  const EmploymentHistory = (
    <>
      <Fieldset
        label="Вид трудовой книжки"
        labelStyles={{ alignSelf: "flex-start", marginTop: "17px" }}
        component={
          <Controller
            name="EmploymentHistoryTypeId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                error={!!errors?.EmploymentHistoryTypeId}
                items={data.history}
              />
            )}
          />
        }
        hint={
          form.EmploymentHistoryTypeId ===
            EmploymentHistoryTypeEnum.Electronic &&
          ELECTRONIC_EMPLOYMENT_HISTORY_TYPE_DESCRIPTION
        }
      />
      <Fieldset
        label="Оригинал справки"
        component={
          <Controller
            name="ApplicationPaperOriginalId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                error={!!errors?.ApplicationPaperOriginalId}
                items={data.papers}
              />
            )}
          />
        }
      />
      <Fieldset
        label="Копия справки"
        component={
          <Controller
            name="ApplicationPaperCopyId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                error={!!errors?.ApplicationPaperCopyId}
                items={data.papers}
              />
            )}
          />
        }
      />
    </>
  );

  const EmploymentApplication = (
    <>
      <Fieldset
        label="Цель получения справки"
        component={
          <Controller
            name="ApplicationGoalId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                error={!!errors?.ApplicationGoalId}
                items={data.goals}
              />
            )}
          />
        }
      />

      {form.ApplicationGoalId === ApplicationGoalEnum.Embassy && (
        <>
          <Fieldset
            label="Получатель справки"
            component={
              <Controller
                name="ApplicationReceiverId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    error={!!errors?.ApplicationReceiverId}
                    items={data.receivers}
                  />
                )}
              />
            }
          />
          <Fieldset
            label="Назначение поездки"
            component={
              <Controller
                name="RoadGoalId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    error={!!errors?.RoadGoalId}
                    items={data.roadGoals}
                  />
                )}
              />
            }
          />
          <Fieldset
            label="Наименование посольства"
            component={
              <Controller
                name="EmbassyNameText"
                control={control}
                render={({ field }) => (
                  <Textfield {...field} error={!!errors?.EmbassyNameText} />
                )}
              />
            }
          />
          <Fieldset
            label="Период поездки"
            component={
              <Controller
                name="RoadDate"
                control={control}
                render={({ field }) => (
                  <DateRangePicker
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors?.RoadDate}
                  />
                )}
              />
            }
          />
        </>
      )}
      {form.ApplicationGoalId === ApplicationGoalEnum.Kindergarten && (
        <>
          <Fieldset
            label="Период отпуска"
            component={
              <Controller
                name="LeaveDate"
                control={control}
                render={({ field }) => (
                  <DateRangePicker
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors?.LeaveDate}
                  />
                )}
              />
            }
          />
        </>
      )}
      {form.ApplicationGoalId === ApplicationGoalEnum.Other && (
        <>
          <Fieldset
            label="Указание зарплаты"
            component={
              <Controller
                name="NeedSalary"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    error={!!errors?.NeedSalary}
                    items={[
                      { Id: true, Title: "Требуется" },
                      { Id: false, Title: "Не требуется" },
                    ]}
                  />
                )}
              />
            }
          />
          <Fieldset
            label="Назначение справки"
            labelStyles={{ alignSelf: "flex-start", marginTop: "17px" }}
            component={
              <Controller
                name="ApplicationGoalText"
                control={control}
                render={({ field }) => (
                  <Textfield
                    {...field}
                    multiline
                    placeholder="Опишите, для чего требуется справка"
                    rows={7}
                    error={!!errors?.ApplicationGoalText}
                  />
                )}
              />
            }
          />
        </>
      )}
    </>
  );

  const ApplicationInfo = (
    <>
      <FieldBox
        head="Информация о справке"
        body={
          <>
            {CertificateType}
            {form.CertificateType === CertificateTypeEnum.NDFL &&
              Employment2NDFL}
            {form.CertificateType === CertificateTypeEnum.EmploymentHistory &&
              EmploymentHistory}
            {form.CertificateType ===
              CertificateTypeEnum.EmploymentApplication &&
              EmploymentApplication}
          </>
        }
      />
    </>
  );

  const AttachedDocuments = (
    <>
      <FieldBox
        head="Прикрепленные документы"
        body={
          <>
            <Fieldset
              label="Свидетельство о рождении ребенка, Свидетельство о браке/установлении отцовства"
              labelPlacement={FieldsetPropsLabelPlacementEnum.Top}
              component={
                <Controller
                  name="Files"
                  control={control}
                  render={({ field }) => (
                    <DndUploader
                      onChange={field.onChange}
                      name={field.name}
                      error={!!errors?.Files}
                    />
                  )}
                />
              }
            />
            {/* <FieldsGrid context="two-column-fieldsets">
              <Fieldset
                label="Свидетельство о рождении ребенка"
                labelPlacement={FieldsetPropsLabelPlacementEnum.Top}
                component={
                  <Controller
                    name="BirthCertificate"
                    control={control}
                    render={({ field }) => (
                      <DndUploader
                        onChange={field.onChange}
                        name={field.name}
                        error={!!errors?.BirthCertificate}
                      />
                    )}
                  />
                }
              />

              <Fieldset
                label="Свидетельство о браке/установлении отцовства"
                labelPlacement={FieldsetPropsLabelPlacementEnum.Top}
                component={
                  <Controller
                    name="MarriageCertificate"
                    control={control}
                    render={({ field }) => (
                      <DndUploader
                        onChange={field.onChange}
                        name={field.name}
                        error={!!errors?.MarriageCertificate}
                      />
                    )}
                  />
                }
              />
            </FieldsGrid> */}
          </>
        }
      />
    </>
  );

  const body = (
    <LocalizationProvider
      dateLibInstance={moment}
      dateAdapter={MomentAdapter}
      locale="ru"
    >
      {CurrentEmployeeInfo}
      {ApplicationInfo}
      {form.CertificateType === CertificateTypeEnum.EmploymentApplication &&
        (form.ApplicationGoalId === ApplicationGoalEnum.NotParentalLeave ||
          form.ApplicationGoalId === ApplicationGoalEnum.ChildBenefit) &&
        AttachedDocuments}
    </LocalizationProvider>
  );

  const actions = (
    <>
      <Button
        size="big"
        variant="dark"
        handleClick={() => {
          initFormData(data.info, initialFormPlaceholder);
        }}
        disabled={form.CertificateType === CertificateTypeEnum.Empty}
      >
        Отмена
      </Button>
      <Button
        size="big"
        type="submit"
        disabled={setCertificateSubmitDisabled(form.CertificateType)}
      >
        Заказать справку
      </Button>
    </>
  );

  const content = (
    <>
      <PageTitle context="order-certificate">Заказ справок</PageTitle>
      <Text style={{ marginBottom: "15px" }}>
        Для оформления заявки на получение справки, пожалуйста, выберете тип
        справки, после чего заполните форму заявки.
      </Text>
      <Text style={{ marginBottom: "40px" }}>
        Срок изготовления справки: 3 рабочих дня.
      </Text>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        fields={body}
        actions={actions}
        context="order-certificate"
        theme={ThemesEnum.Fancy}
      />
    </>
  );

  const handleRender = (state: OrderCertificateFormStateEnum) => {
    switch (state) {
      case OrderCertificateFormStateEnum.Fetched:
        return content;
      case OrderCertificateFormStateEnum.Error:
        return <PostResultShowcase btnAction={resultAction} />;
      case OrderCertificateFormStateEnum.DataFetching:
      default:
        return <Preloader isFullScreen />;
    }
  };

  return <>{handleRender(status)}</>;
};

export default OrderCertificateForm;
