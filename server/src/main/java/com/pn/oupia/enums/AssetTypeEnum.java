package com.pn.oupia.enums;

public enum AssetTypeEnum {
    BOARDING_HOUSE("Dãy trọ"),
    SHARED_HOUSING_SYSTEM ("Hệ thống nhà chung"),
    APARTMENT ("Chung cư"),
    DORMIROTY ("Ký túc xá"),
    STUDIO_APARTMENT ("Căn hộ mini"),
    ENTIRE_HOUSE("Nhà nguyên căn");

    private final String displayName;

    private AssetTypeEnum(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
