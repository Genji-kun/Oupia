package com.pn.oupia.enums;

public enum RoleEnum {
    ROLE_ADMIN("Quản trị viên"),
    ROLE_LANDLORD ("Chủ trọ"),
    ROLE_TENANT ("Người tìm trọ");

    private final String displayName;

    private RoleEnum(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
